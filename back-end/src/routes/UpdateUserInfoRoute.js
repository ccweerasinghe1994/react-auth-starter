import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';
import { ObjectId } from 'mongodb';

export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {

        try {
            const { authorization } = req.headers;
            const { userId } = req.params;

            const updates = (({ hairColor, favoriteFood, bio }) => ({ hairColor, favoriteFood, bio }))(req.body);

            if (!authorization) {
                return res.sendStatus(401).json({ message: 'No authorization headers sent from the client' });
            }
            // Bearer 1234567890
            const token = authorization.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.sendStatus(401).json({ message: 'Unable to verify token' });
                }

                const { id } = decoded;

                if (id !== userId) {
                    return res.sendStatus(403).json({ message: 'Not allowed to update this user info' });
                }

                const db = getDbConnection('react-auth-db');
                const result = await db.collection('users').findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: { info: updates } },
                    { returnOriginal: false },
                );

                const { email, info, isVerified } = result.value;

                jwt.sign({ id, email, info, isVerified }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                    if (err) {
                        return res.status(500).json({ message: 'Unable to generate token' });
                    }

                    return res.status(200).json({ token });
                });
            });
        } catch (error) {
            console.log("🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥", error);
        }


    }
};