import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
	const [emailValue, setEmailValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const navigate = useNavigate();

	const onLoginClicked = () => {
		alert(`log in not implemented yet`);
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
				disabled={!emailValue || !passwordValue}
				value={passwordValue}
				onChange={(e) => setPasswordValue(e?.target?.value)}
				type="password"
				placeholder="password"
			/>
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
