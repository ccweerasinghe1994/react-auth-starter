
import nodemailer from 'nodemailer';


export const sendEmail = async (to, subject, text) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,

        },
    });

    const info = await transport.sendMail({
        from: `"chamara" <${process.env.EMAIL}>`,
        to: to,
        subject: subject,
        text: text
    });

    return info;

}