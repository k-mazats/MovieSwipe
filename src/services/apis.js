import axios from 'axios';

export const getMovies = async (query) => {
	const options = {
		method: 'POST',
		url: 'https://course-search-proxy.herokuapp.com',
		data: {
			urlToGet: `https://tastedive.com/api/similar?q=${query}&k=${
				import.meta.env.VITE_APP_TASTEDIVE_KEY
			}&type=movies&info=1&limit=50`,
		},
	};
	try {
		let response = await axios(options);
		return response;
	} catch (err) {
		console.error(err);
	}
};
