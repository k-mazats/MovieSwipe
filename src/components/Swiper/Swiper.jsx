import { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import Modal from 'react-modal';
import { getMovies } from '../../services/apis';
Modal.setAppElement('#root');

const Swiper = (props) => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const {
		fullMoviesList,
		likeHistory,
		setLikeHistory,
		setMovies,
		moviesRecommendations,
		reset,
		canSwipe,
		setCanSwipe,
	} = props;
	const [currentIndex, setCurrentIndex] = useState(fullMoviesList.length - 1);
	const [lastDirection, setLastDirection] = useState();
	// used for outOfFrame closure
	const currentIndexRef = useRef(currentIndex);

	const childRefs = useMemo(
		() =>
			Array(fullMoviesList.length)
				.fill(0)
				.map((i) => React.createRef()),
		[]
	);
	const openModal = () => {
		setIsOpen(true);
	};
	const closeModal = () => {
		setIsOpen(false);
	};
	const updateCurrentIndex = (val) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

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

	const updateRecommendations = async () => {
		const queryString = likeHistory.join(',');
		const res = await getMovies(queryString);
		const tempArray = shuffle(res.data.Similar.Results);
		const movieDatas = tempArray.find((movie) => {
			return !moviesRecommendations.some((item) => {
				item.Name === movie.Name;
			});
		});
		setMovies((moviesRecommendations) => [
			movieDatas,
			...moviesRecommendations,
		]);
	};

	// set last direction and decrease current index
	const swiped = async (direction, title, index) => {
		// issue here after first swipe while the state is being updated correctly it return false even if true
		console.log(canSwipe);
		if (canSwipe) {
			setLastDirection(direction);
			if (direction === 'right' || direction === 'left') {
				setLikeHistory((likeHistory) => [...likeHistory, `movie:${title}`]);
				updateCurrentIndex(index - 1);
				setCanSwipe(false);
			} else if (direction === 'down') {
				reset();
			} else if (direction === 'up') {
				openModal();
			}
		}
	};

	useEffect(() => {
		if (likeHistory?.length > 1) {
			(async () => {
				await updateRecommendations();
			})();
		}
	}, [likeHistory]);
	useEffect(() => {
		setCanSwipe(false);
	}, [fullMoviesList]);
	return (
		<div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="Movie details"
				className="movie-modal"
				overlayClassName="movie-modal-overlay"
			>
				<div className="uk-background-secondary uk-width-1-1 uk-height-1-1">
					<div className="uk-background-secondary uk-width-1-1 uk-height-1-1">
						<button
							onClick={closeModal}
							className="uk-icon-button movie-modal-close uk-background-secondary uk-position-small uk-position-top-right"
							uk-icon="close"
							type="button"
						></button>
						<div className="uk-width-1-1 uk-background-secondary">
							<div className="uk-width-1-1 uk-height-small uk-cover-container">
								<img
									src={fullMoviesList[1]?.Poster}
									alt=""
									uk-cover="true"
									className="uk-width-1-1"
								/>
								<div className="uk-overlay uk-overlay-primary uk-position-bottom">
									<h2>{fullMoviesList[1]?.Title}</h2>
								</div>
							</div>
							<dl className="uk-description-list uk-padding-small uk-text-small uk-margin-remove uk-padding-small uk-light">
								<dt className="uk-text-secondary">Plot :</dt>
								<dd>{fullMoviesList[1]?.Plot}</dd>
								<dt className="uk-text-secondary">Directed by :</dt>
								<dd>{fullMoviesList[1]?.Director}</dd>
								<dt className="uk-text-secondary">Actors :</dt>
								<dd>{fullMoviesList[1]?.Actors}</dd>
								<dt className="uk-text-secondary">Written by :</dt>
								<dd>{fullMoviesList[1]?.Writer}</dd>
								<dt className="uk-text-secondary">Genre :</dt>
								<dd>{fullMoviesList[1]?.Genre}</dd>
								<dt className="uk-text-secondary">Runtime :</dt>
								<dd>{fullMoviesList[1]?.Runtime}</dd>
								<dt className="uk-text-secondary">Rating IMDB :</dt>
								<dd>{fullMoviesList[1]?.imdbRating}</dd>
							</dl>
						</div>
					</div>
				</div>
			</Modal>
			<div className="cardContainer">
				{fullMoviesList.map((movie, index) => {
					return (
						<TinderCard
							ref={childRefs[index]}
							className="swipe"
							key={`movie-card-${movie.imdbID}`}
							onSwipe={(dir) => swiped(dir, movie.Title, index)}
							preventSwipe={canSwipe ? ['up'] : ['up', 'down', 'left', 'right']}
							swipeRequirementType="position"
						>
							<div
								style={{ backgroundImage: `url('${movie.Poster}')` }}
								className="card"
							>
								<h3 className="card-title">{movie.Title}</h3>
							</div>
						</TinderCard>
					);
				})}
			</div>
		</div>
	);
};
export default Swiper;
