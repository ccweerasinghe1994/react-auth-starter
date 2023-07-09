import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getDbConnection } from '../db';


export const loginRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        const db = getDbConnection('react-auth-db');

        const user = await db.collection('users').findOne({ email });

        if (!user) {
            //  this is a unauthorized error
            return res.sendStatus(401);
        }

        const { _id: id, isVerified, passwordHash, info } = user;

        const isCorrect = await bcrypt.compare(password, passwordHash);

        if (isCorrect) {
            sign({ id, isVerified, email, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    return res.sendStatus(500);
                }

                return res.status(200).json({ token });
            });
        } else {
            //  this is a unauthorized error
            return res.sendStatus(401);
        }
    }
}