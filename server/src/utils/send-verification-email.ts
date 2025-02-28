import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, firstName: string, verifyCode: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Account",
            text: `Hello ${firstName},\n\nYour verification code is: ${verifyCode}\n\nUse this code to verify your account.`,
        };

        const info = await transporter.sendMail(mailOptions);

        return { success: true, message: `Email sent: ${info.response}` };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send verification email" };
    }
}
