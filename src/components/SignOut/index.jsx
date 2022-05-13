import { auth } from '../../services/firebase';

const SignIn = () => {
	return (
		<a
			href=""
			className="uk-icon-button uk-text-secondary"
			uk-icon="icon: sign-out"
			onClick={() => auth.signOut()}
		></a>
	);
};

export default SignIn;
