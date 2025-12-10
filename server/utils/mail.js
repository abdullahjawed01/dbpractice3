import dotenv from "dotenv";
dotenv.config();



import nodemailer from "nodemailer";

async function email(mail, OTP) {
    try {
        const user = "abdullahjawed2021@gmail.com"
        const pass = process.env.APPPASS;
        console.log(user);
        console.log(pass);

        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: user,
                pass: pass
            }
        });

        const info = await transport.sendMail({
            from: user,
            to: mail,
            subject: "OTP Verification",
            text: `Your OTP is: ${OTP}`,
        });

        console.log("Email sent:", info.messageId);
        return info;

    } catch (error) {
        console.log("Email error:", error);
        return null;
    }
}

export default email;

