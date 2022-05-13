import { NavLink } from 'react-router-dom';
import SignOut from '../SignOut';
const Nav = () => {
	return (
		<nav className="uk-navbar uk-navbar-container uk-width-1-1 uk-position-bottom">
			<ul className="uk-iconnav uk-flex uk-width-1-1 uk-flex-around uk-flex-middle">
				<li>
					<NavLink
						to="/"
						className={(isActive) =>
							'uk-icon-button uk-text-secondary' + (isActive ? 'uk-active' : '')
						}
						uk-icon="icon: code"
					></NavLink>
				</li>
				<li>
					<NavLink
						className="uk-icon-button uk-text-secondary"
						to="/lists"
						uk-icon="icon: list"
					></NavLink>
				</li>
				<li>
					<SignOut></SignOut>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
