import { sendEmail } from "../util/SendEmail";


export const emailSendRoute = {
    path: '/api/email-send',
    method: 'post',
    handler: async (req, res) => {
        try {
            const info = await sendEmail();
            return res.sendStatus(200).json({ info });
        } catch (error) {
            console.error(error);
            return res.sendStatus(500);
        }

    }
}