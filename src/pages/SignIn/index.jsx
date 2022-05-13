import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { signInWithGoogle } from '../../services/firebase';

const SignIn = () => {
	const { currentUser } = useContext(AuthContext);
	if (currentUser) {
		return <Navigate to="/" replace />;
	}
	return (
		<div className="uk-flex uk-width-1-1 uk-height-1-1 uk-flex-center uk-flex-middle">
			<button
				className="uk-button uk-button-default"
				onClick={signInWithGoogle}
			>
				Sign in with google
			</button>
		</div>
	);
};

export default SignIn;
