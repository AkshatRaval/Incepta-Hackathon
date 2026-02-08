import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdmin } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

// POST - Send OTP to email
export async function POST(request: NextRequest) {
  try {
    const { email, type } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { auth, db } = getFirebaseAdmin();

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in Firestore
    await db.collection("otps").doc(email).set({
      otp,
      type, // 'signup' or 'login'
      expiresAt,
      createdAt: new Date(),
    });

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "noreply@incepta.dev",
          to: email,
          subject: `Your INCEPTA Verification Code: ${otp}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #22d3ee; text-align: center;">INCEPTA 2026</h1>
              <div style="background: #0f172a; border-radius: 12px; padding: 30px; text-align: center;">
                <h2 style="color: #f1f5f9; margin-bottom: 20px;">Your Verification Code</h2>
                <div style="font-size: 36px; font-weight: bold; color: #22d3ee; letter-spacing: 8px; margin: 20px 0;">
                  ${otp}
                </div>
                <p style="color: #94a3b8; font-size: 14px;">
                  This code expires in 10 minutes. Do not share it with anyone.
                </p>
              </div>
              <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 20px;">
                If you didn't request this code, please ignore this email.
              </p>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        console.error("Failed to send email:", await res.text());
        return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully"
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
