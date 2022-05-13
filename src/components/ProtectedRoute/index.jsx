import { Navigate, Outlet } from 'react-router-dom';
import {useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = () => {
	const { currentUser } = useContext(AuthContext);
	if (!currentUser) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet></Outlet>;
};
export default ProtectedRoute;
