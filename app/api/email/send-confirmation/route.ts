import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/firebase-admin";
import { sendEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

// POST - Send application confirmation email
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { applicationId, applicantName, applicantEmail } = await request.json();

    // Send confirmation email via Nodemailer
    const emailRes = await sendEmail({
      to: applicantEmail,
      subject: "🎉 Application Received - INCEPTA 2026",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #020617;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #22d3ee; font-size: 32px; margin: 0;">INCEPTA 2026</h1>
            <p style="color: #94a3b8;">Build. Innovate. Win.</p>
          </div>
          
          <div style="background: #0f172a; border-radius: 16px; padding: 30px; border: 1px solid #334155;">
            <h2 style="color: #f1f5f9; margin-top: 0;">Hey ${applicantName}! 👋</h2>
            
            <p style="color: #94a3b8; line-height: 1.6;">
              We've received your application for <strong style="color: #22d3ee;">INCEPTA Hackathon 2026</strong>!
            </p>
            
            <div style="background: #1e293b; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #22d3ee;">
              <p style="color: #f1f5f9; margin: 0;">
                <strong>Application ID:</strong> ${applicationId}
              </p>
              <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">
                Save this for your reference
              </p>
            </div>
            
            <h3 style="color: #f1f5f9;">What's Next?</h3>
            <ol style="color: #94a3b8; line-height: 1.8;">
              <li>Our team will review your application within <strong style="color: #22d3ee;">5-7 business days</strong></li>
              <li>Complete your payment to confirm your spot</li>
              <li>You'll receive an email with further instructions once approved</li>
            </ol>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile" 
                 style="background: linear-gradient(to right, #22d3ee, #d946ef); 
                        color: #020617; 
                        text-decoration: none; 
                        padding: 12px 30px; 
                        border-radius: 8px; 
                        font-weight: bold;
                        display: inline-block;">
                View Application Status
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #64748b; font-size: 12px;">
              Questions? Reply to this email or contact us at hello@incepta.dev
            </p>
            <div style="margin-top: 20px;">
              <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px;">Twitter</a>
              <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px;">Discord</a>
              <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px;">Instagram</a>
            </div>
          </div>
        </div>
      `,
    });

    if (!emailRes.success) {
      console.error("Failed to send email:", emailRes.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
