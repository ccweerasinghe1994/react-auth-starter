import './App.css';
import { Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import RequireAuth from './pages/RequireAuth';
function App() {
	return (
		<div className="page-container">
			<Routes>
				<Route element={<RequireAuth />}>
					<Route path={'/'} element={<UserInfoPage />} />;
				</Route>
				<Route path={'/login'} element={<LoginPage />} />;
				<Route path={'/signup'} element={<SignUpPage />} />;
			</Routes>
		</div>
	);
}

export default App;
