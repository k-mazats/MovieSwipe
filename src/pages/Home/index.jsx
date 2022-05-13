import { useState, useEffect } from 'react';
import { getMovieDetails } from '../../services/apis';
import Nav from '../../components/Nav';
import SearchMovie from '../../components/SearchMovie';
import Swiper from '../../components/Swiper/Swiper';
const Home = () => {
	const [moviesRecommendations, setMoviesRecommendations] = useState();
	const [fullMoviesList, setFullMoviesList] = useState([]);
	const [likeHistory, setLikeHistory] = useState([]);
	useEffect(() => {
		if (moviesRecommendations && moviesRecommendations.length <= 5) {
			moviesRecommendations.forEach(async (movie) => {
				const res = await getMovieDetails(movie.Name);
				setFullMoviesList((fullMoviesList) => [...fullMoviesList, res.data]);
			});
		} else if (moviesRecommendations) {
			(async () => {
				const res = await getMovieDetails(moviesRecommendations[0].Name);
				setFullMoviesList((fullMoviesList) => [
					
					...fullMoviesList,res.data,
				]);
			})();
		}
	}, [moviesRecommendations]);
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
				></Swiper>
			)}
		</div>
	);
};

export default Home;
