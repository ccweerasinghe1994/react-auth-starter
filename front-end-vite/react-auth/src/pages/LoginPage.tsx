import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { useToken } from '../hooks/useToken';
const LoginPage: React.FC = () => {
	const [emailValue, setEmailValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const navigate = useNavigate();
	const { setToken } = useToken();

	const onLoginClicked = async () => {
		const response: AxiosResponse<{ token: string }> = await axios.post(
			'http://localhost:8080/api/login',
			{
				email: emailValue,
				password: passwordValue
			}
		);
		const { token } = response.data;

		setToken(token);
		navigate('/');
	};
	return (
		<div className="content-container">
			<h1>Login Page</h1>
			{errorMessage && <div className="fail">{errorMessage}</div>}
			<input
				value={emailValue}
				onChange={(e) => setEmailValue(e?.target?.value)}
				type="email"
				placeholder="someOne@gmail.com"
			/>
			<input
				value={passwordValue}
				onChange={(e) => setPasswordValue(e?.target?.value)}
				type="password"
				placeholder="password"
			/>
			<hr />
			<button onClick={onLoginClicked}>Log In</button>
			<button onClick={() => navigate('/forget-password')}>
				forgot your password
			</button>
			<button onClick={() => navigate('/signup')}>
				don't have and account? Sign Up
			</button>
		</div>
	);
};

export default LoginPage;
