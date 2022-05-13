import { useState, useEffect } from 'react';

import Home from './pages/Home';

import './App.css';

function App() {
	return (
		<div className="App uk-background-secondary uk-light uk-width-1-1 uk-height-1-1">
			<div className=" uk-width-1-1 uk-height-1-1">
				<Home></Home>
			</div>
		</div>
	);
}

export default App;
