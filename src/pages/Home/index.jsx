import { useState, useEffect } from 'react';
import { getMovieDetails } from '../../services/apis';

import SearchMovie from '../../components/SearchMovie';
import Swiper from '../../components/Swiper/Swiper';
const Home = () => {
	const [moviesRecommendations, setMoviesRecommendations] = useState();
	const [fullMoviesList, setFullMoviesList] = useState([]);
	const [likeHistory, setLikeHistory] = useState([]);
	const [canSwipe, setCanSwipe] = useState(true);
	const reset = () => {
		setLikeHistory([]);
		setMoviesRecommendations();
		setFullMoviesList([]);
	};
	useEffect(() => {
		if (moviesRecommendations && moviesRecommendations?.length > 2) {
			(async () => {
				const res = await getMovieDetails(moviesRecommendations[0].Name);

				setFullMoviesList([res.data, ...fullMoviesList]);
			})();
		} else if (moviesRecommendations && moviesRecommendations?.length === 2) {
			moviesRecommendations.forEach(async (movie) => {
				const res = await getMovieDetails(movie.Name);
				setFullMoviesList((fullMoviesList) => [...fullMoviesList, res.data]);
			});
		}
	}, [moviesRecommendations]);
	useEffect(() => {
		setCanSwipe(true)
	},[fullMoviesList])
	return (
		<div className="layout uk-flex uk-width-1-1 uk-flex-center uk-flex-middle">
			{!moviesRecommendations ? (
				<SearchMovie
					setMovies={setMoviesRecommendations}
					setLikeHistory={setLikeHistory}
				></SearchMovie>
			) : (
				<Swiper
					setMovies={setMoviesRecommendations}
					moviesRecommendations={moviesRecommendations}
					fullMoviesList={fullMoviesList}
					setFullMoviesList={setFullMoviesList}
					likeHistory={likeHistory}
					setLikeHistory={setLikeHistory}
					reset={reset}
					canSwipe={canSwipe}
					setCanSwipe={setCanSwipe}
				></Swiper>
			)}
		</div>
	);
};

export default Home;
