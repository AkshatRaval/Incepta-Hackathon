import nodemailer from 'nodemailer';

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
    try {
        // If SMTP is not configured, log and return (for dev mode without creds)
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
            console.log('⚠️ SMTP not configured. Email would have been sent to:', to);
            console.log('Subject:', subject);
            return { success: true, messageId: 'dev-mock-id' };
        }

        const info = await transporter.sendMail({
            from: from || process.env.EMAIL_FROM || '"INCEPTA" <noreply@incepta.dev>',
            to,
            subject,
            html,
        });

        console.log('Message sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
}
