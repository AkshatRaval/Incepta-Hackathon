import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { purpose, amount, buyer_name, email, phone, redirect_url } = body;

        // Basic validation
        if (!purpose || !amount || !email || !phone || !buyer_name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const API_KEY = process.env.INSTAMOJO_API_KEY;
        const AUTH_TOKEN = process.env.INSTAMOJO_AUTH_TOKEN;
        const BASE_URL = process.env.INSTAMOJO_URL || "https://www.instamojo.com/api/1.1/";

        if (!API_KEY || !AUTH_TOKEN) {
            console.error("Instamojo credentials missing");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const formData = new URLSearchParams();
        formData.append("purpose", purpose);
        formData.append("amount", amount.toString());
        formData.append("buyer_name", buyer_name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("redirect_url", redirect_url);
        formData.append("send_email", "True");
        formData.append("send_sms", "True");
        formData.append("allow_repeated_payments", "False");

        const response = await fetch(`${BASE_URL}payment-requests/`, {
            method: "POST",
            headers: {
                "X-Api-Key": API_KEY,
                "X-Auth-Token": AUTH_TOKEN,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        const data = await response.json();

        if (!data.success) {
            console.error("Instamojo Error:", data);
            return NextResponse.json(
                { error: data.message || "Payment creation failed", details: data.message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            longurl: data.payment_request.longurl,
            id: data.payment_request.id
        });

    } catch (error) {
        console.error("Payment API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
