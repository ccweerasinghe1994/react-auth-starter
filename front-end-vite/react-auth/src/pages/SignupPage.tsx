import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../hooks/useToken';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
const SignUpPage: React.FC = () => {
	const [emailValue, setEmailValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');

	const navigate = useNavigate();

	const { setToken } = useToken();

	const onSignUpClicked = async () => {
		const response: AxiosResponse<{ token: string }> = await axios.post(
			'http://localhost:8080/api/signup',
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
			<h1>Sign Up Page</h1>
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
			<input
				value={confirmPasswordValue}
				onChange={(e) => setConfirmPasswordValue(e?.target?.value)}
				type="password"
				placeholder="confirm password"
			/>
			<hr />
			<button
				disabled={
					!emailValue ||
					!passwordValue ||
					passwordValue !== confirmPasswordValue
				}
				onClick={onSignUpClicked}
			>
				Sign Up
			</button>
			<button onClick={() => navigate('/login')}>
				Already have and account? log in
			</button>
		</div>
	);
};

export default SignUpPage;
