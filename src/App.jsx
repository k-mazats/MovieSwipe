import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Lists from './pages/Lists';
import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav';
import { readUser, createUser } from './services/firestore';



import './App.css';

function App() {
	const { currentUser } = useContext(AuthContext);
	const [userProfil, setUserProfil] = useState();

	useEffect(() => {
		if (currentUser) {
			(async () => {
				const completeUser =
					(await readUser(currentUser._delegate.uid)) ??
					((await createUser(currentUser._delegate.uid)) &&
						(await readUser(currentUser._delegate.uid)));
				setUserProfil(completeUser);
			})();
		}
	}, [currentUser]);

	return (
		<Router>
			<div className="App uk-background-secondary uk-light uk-width-1-1 uk-height-1-1">
				<div className=" uk-width-1-1 uk-height-1-1">
					<Routes>
						<Route exact path="/lists" element={<ProtectedRoute />}>
							<Route exact path="/lists" element={<Lists />}></Route>
						</Route>
						<Route path="/" element={<ProtectedRoute />}>
							<Route path="/" element={<Home />} />
						</Route>
						<Route exact path="/login" element={<SignIn />} />
					</Routes>
					{currentUser ? <Nav></Nav> : null}
				</div>
			</div>
		</Router>
	);
}

export default App;
