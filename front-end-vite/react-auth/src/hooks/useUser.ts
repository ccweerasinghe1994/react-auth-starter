import { useToken } from './useToken';
import { useState, useEffect } from 'react';
export const useUser = () => {
	const { token } = useToken();

	const getPayloadFromToken = (token: string) => {
		const encodedPayload = token.split('.')[1];
		return JSON.parse(atob(encodedPayload)) as object;
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
