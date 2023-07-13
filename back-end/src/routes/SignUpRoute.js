import { getDbConnection } from "../db";
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import { v4 as uuid } from 'uuid';
import { sendEmail } from "../util/SendEmail";
export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        const db = getDbConnection('react-auth-db');

        const user = await db.collection('users').findOne({ email });

        if (user) {
            //  this is a conflict error
            return res.sendStatus(409);
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const verificationString = uuid();
        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        }

        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false,
            verificationString,
        });
        try {
            await sendEmail(email, 'Please verify your email address', `
        Thanks for signing up for our app! Please click the link below to verify your email address:
        http://localhost:5173/veryfy-email/${verificationString}
        `);

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }

        const { insertedId } = result;

        sign({ id: insertedId, email, info: startingInfo, isVerified: false, }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                res.sendStatus(500);
            }

            return res.status(200).json({ token });
        });
    },
};