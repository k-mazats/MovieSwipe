import { useState, useEffect } from 'react';
import { getMovies } from '../../services/apis';
const SearchMovie = (props) => {
	const { setMovies, setLikeHistory } = props;

	const [movieSearch, setMovieSearch] = useState('');
	const shuffle = (array) => {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	};
	const handleSubmit = async (e) => {

		e.preventDefault();
		(async () => {
			const res = await getMovies(`movie:${movieSearch}`, 50);
			setLikeHistory([`movie:${movieSearch}`])
			const shuffled = shuffle(res.data.Similar.Results);
			setMovies([shuffled[0]]);
		})();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="uk-inline">
				<span
					className="uk-form-icon uk-form-icon-flip"
					uk-icon="icon: search"
				></span>
				<input
					type="text"
					value={movieSearch}
					onChange={(e) => setMovieSearch(e.target.value)}
					className="uk-input"
				/>
			</div>
		</form>
	);
};

export default SearchMovie;
