import { useToken } from './useToken';
import { useState, useEffect } from 'react';

export type User = {
	id: string;
	email: string;
	info: {
		hairColor: string;
		favoriteFood: string;
		bio: string;
	};
};

export const useUser = () => {
	const { token } = useToken();

	const getPayloadFromToken = (token: string) => {
		const encodedPayload = token.split('.')[1];
		return JSON.parse(atob(encodedPayload)) as User;
	};

	const [user, setUser] = useState(() => {
		if (!token) return null;
		return getPayloadFromToken(token);
	});

	useEffect(() => {
		if (!token) {
			setUser(null);
		} else {
			setUser(getPayloadFromToken(token));
		}
	}, [token]);

	return user;
};
