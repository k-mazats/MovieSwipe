import axios from 'axios';

export const getMovies = async (query,limit) => {
	const options = {
		method: 'POST',
		url: 'https://course-search-proxy.herokuapp.com',
		data: {
			urlToGet: `https://tastedive.com/api/similar?q=${query}&k=${
				import.meta.env.VITE_APP_TASTEDIVE_KEY
			}&type=movies&info=1&limit=${limit}`,
		},
	};
	try {
		let response = await axios(options);
		return response;
	} catch (err) {
		console.error(err);
	}
};
export const getMovieDetails = async (movie) => {
	const options = {
		method: 'GET',
		url: `http://www.omdbapi.com/?apikey=${
			import.meta.env.VITE_APP_OMDB_KEY
		}&typt=movie&t=${movie}`,
	};
	try {
		let response = await axios(options);
		return response;
	} catch (err) {
		console.error(err);
	}
};
export const searchMovies = async (movie) => {
	const options = {
		method: 'GET',
		url: `http://www.omdbapi.com/?apikey=${
			import.meta.env.VITE_APP_OMDB_KEY
		}&typt=movie&s=${movie}&page=1`,
	};
	try {
		let response = await axios(options);
		return response;
	} catch (err) {
		console.error(err);
	}
};
