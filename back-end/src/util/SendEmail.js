
import nodemailer from 'nodemailer';


export const sendEmail = async () => {
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
        to: 'ccweerasinghe1995@gmail.com',
        subject: 'Hello from react-auth',
        text: 'Hello world?',
        html: '<b>Hello world?</b>',
    });

    return info;

}