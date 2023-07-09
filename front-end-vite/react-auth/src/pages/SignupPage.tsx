import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
	const [emailValue, setEmailValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');

	const navigate = useNavigate();

	const onSignUpClicked = () => {
		alert(`sign up not implemented yet`);
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
