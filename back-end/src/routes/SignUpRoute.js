import { getDbConnection } from "../db";
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        const db = getDbConnection('react-auth-db');

        const user = await db.collection('users').findOne({ email });

        if (user) {
            //  this is a conflict error
            res.sendStatus(409);
        }

        const passwordHash = await bcrypt.hash(password, 10);

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
        });

        const { insertedId } = result;

        sign({ id: insertedId, email, info: startingInfo, isVerified: false, }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                res.sendStatus(500);
            }

            res.status(200).json({ token });
        });
    },
};