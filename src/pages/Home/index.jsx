import { useState, useEffect } from 'react';
import { getMovies } from '../../services/apis';
import Nav from '../../components/Nav';
import SearchMovie from '../../components/SearchMovie';
const Home = () => {
	const [moviesRecommendations, setMoviesRecommendations] = useState();
	
	// useEffect(() => {
	// 	let topMoviesTemp = [];
	// 	(async () => {
	// 		const res = await getMovies();
	// 		console.log(res);
	// 	})();
	// }, []);
	return (
		<div className="layout uk-flex uk-width-1-1 uk-flex-center uk-flex-middle">
			<SearchMovie></SearchMovie>
		</div>
	);
};

export default Home;
