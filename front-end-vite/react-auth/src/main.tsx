import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage.tsx';
import type { RouteObject, Router } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';

const routeObject: RouteObject[] = [
	{
		path: '/',
		element: <UserInfoPage />
	},
	{
		path: '/login',
		element: <LoginPage />
	}
];

const router = createBrowserRouter(routeObject);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<div className="page-container">
			<RouterProvider router={router} />
		</div>
	</React.StrictMode>
);
