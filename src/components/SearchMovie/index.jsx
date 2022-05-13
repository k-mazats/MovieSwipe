import { useState, useEffect } from 'react';
import { useCombobox } from 'downshift';
import { getMovies, searchMovies } from '../../services/apis';

const SearchMovie = (props) => {
	const { setMovies, setLikeHistory } = props;
	const [items, setItems] = useState([]);
	const [movieSearch, setMovieSearch] = useState('');
	const [inputItems, setInputItems] = useState(items);
	const handleInputValueChange = async (value) => {
		setMovieSearch(value);
	};
	const {
		isOpen,
		getMenuProps,
		getInputProps,
		getComboboxProps,
		highlightedIndex,
		getItemProps,
	} = useCombobox({
		items: inputItems,
		onInputValueChange: async ({ inputValue }) => {
			await handleInputValueChange(inputValue);
		},
		onSelectedItemChange: handleInputValueChange,
	});
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
			console.log(res);
			if (res.data.Similar.Results.length > 0) {
				setLikeHistory([`movie:${movieSearch}`]);
				const shuffled = shuffle(res.data.Similar.Results);
				setMovies([shuffled[0], shuffled[1]]);
			}
		})();
	};
	useEffect(() => {
		if (movieSearch.length > 2 && movieSearch.slice(-1) !== ' ') {
			(async () => {
				const tempArray = await searchMovies(movieSearch);
				setInputItems(tempArray.data.Search.map((movie) => movie.Title));
			})();
		}
	}, [movieSearch]);
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<div>
					<div {...getComboboxProps()} className="uk-inline">
						<span
							className="uk-form-icon uk-form-icon-flip"
							uk-icon="icon: search"
						></span>
						<input {...getInputProps()} className="uk-input" />
					</div>
					<ul {...getMenuProps()}>
						{isOpen &&
							inputItems.map((item, index) => (
								<li
									style={
										highlightedIndex === index
											? { backgroundColor: '#bde4ff' }
											: {}
									}
									key={`${item}${index}`}
									{...getItemProps({ item, index })}
								>
									{item}
								</li>
							))}
					</ul>
				</div>
			</div>
		</form>
	);
};

export default SearchMovie;
