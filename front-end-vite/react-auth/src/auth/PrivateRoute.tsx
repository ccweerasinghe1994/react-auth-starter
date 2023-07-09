import { Route, redirect, useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
	path: string;
	element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
	// const user = null;
	// const navigate = useNavigate();
	// if (!user) {
	// 	console.log('user is null');

	// 	// navigate('/login');
	// }

	return <Route {...props} />;
};

export default PrivateRoute;
