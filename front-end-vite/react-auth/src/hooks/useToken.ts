import { useState } from 'react';

export const useToken = () => {
	const [token, setTokenInternal] = useState<string | null>(() => {
		return localStorage.getItem('token');
	});

	const setToken = (newToken: string | null) => {
		localStorage.setItem('token', newToken || '');
		setTokenInternal(newToken);
	};

	return { token, setToken };
};
