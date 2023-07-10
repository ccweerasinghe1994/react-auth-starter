import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const RequireAuth = () => {
	const user = useUser();

	const location = useLocation();

	return user ? (
		<Outlet />
	) : (
		<Navigate
			to={`/login`}
			state={{
				from: location
			}}
			replace
		/>
	);
};
export default RequireAuth;
