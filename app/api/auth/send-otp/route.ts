import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdmin } from "@/lib/firebase-admin";
import twilio from "twilio";
import { sendEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

// POST - Send OTP to email and/or SMS
export async function POST(request: NextRequest) {
  try {
    const { email, phone, type } = await request.json();

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
      email,
      phone: phone || null,
      expiresAt,
      createdAt: new Date(),
    });

    const results = {
      email: "skipped",
      sms: "skipped"
    };

    // 1. Send email using Nodemailer
    if (process.env.SMTP_HOST) {
      const emailRes = await sendEmail({
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
      });

      if (!emailRes.success) {
        console.error("Failed to send email:", emailRes.error);
        results.email = "failed";
      } else {
        results.email = "sent";
      }
    } else {
      console.log("SMTP not configured, skipping email");
    }

    // 2. Send SMS using Twilio
    if (phone && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER) {
      try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        // Ensure phone number is in E.164 format (assuming Indian numbers for now)
        const to = phone.startsWith("+") ? phone : `+91${phone}`;

        await client.messages.create({
          body: `Your INCEPTA verification code is: ${otp}`,
          from: process.env.TWILIO_FROM_NUMBER,
          to: to
        });
        results.sms = "sent";
      } catch (error) {
        console.error("Twilio SMS failed:", error);
        results.sms = "failed";
      }
    }

    // Dev Mode / Fallback Logging
    if (results.email !== "sent" || results.sms !== "sent") {
      console.log("\n==============================");
      console.log(`🔐 OTP for ${email} ${phone ? `& ${phone}` : ""}: ${otp}`);
      console.log(`📧 Email Status: ${results.email}`);
      console.log(`📱 SMS Status: ${results.sms}`);
      console.log("==============================\n");
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      details: results
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
