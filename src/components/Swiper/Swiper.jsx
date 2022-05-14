import { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { getMovies } from '../../services/apis';
const Swiper = (props) => {
	const {
		fullMoviesList,
		likeHistory,
		setLikeHistory,
		setMovies,
		moviesRecommendations,
		reset,
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

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

	const canGoBack = currentIndex < fullMoviesList.length - 1;

	const canSwipe = currentIndex >= 0;
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
				console.log(item);
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
		setLastDirection(direction);
		console.log(direction);
		if (direction === 'right' || direction === 'left') {
			setLikeHistory((likeHistory) => [...likeHistory, `movie:${title}`]);
			updateCurrentIndex(index - 1);
		} else if (direction === 'down') {
			reset();
		} else if (direction === 'up') {
			return;
		}
	};

	const outOfFrame = (name, idx) => {
		console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
		// handle the case in which go back is pressed before card goes outOfFrame
		currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
		// TODO: when quickly swipe and restore multiple times the same card,
		// it happens multiple outOfFrame events are queued and the card disappear
		// during latest swipes. Only the last outOfFrame event should be considered valid
	};

	const swipe = async (dir) => {
		if (canSwipe && currentIndex < fullMoviesList.length) {
			if (dir === 'right' || dir === 'left') {
				await childRefs[currentIndex].current.swipe(dir);
			}
			// Swipe the card!
		}
	};

	// increase current index and show card
	// const goBack = async () => {
	// 	if (!canGoBack) return;
	// 	const newIndex = currentIndex + 1;
	// 	updateCurrentIndex(newIndex);
	// 	await childRefs[newIndex].current.restoreCard();
	// };
	useEffect(() => {
		if (likeHistory?.length > 1) {
			(async () => {
				await updateRecommendations();
			})();
		}
	}, [likeHistory]);
	return (
		<div>
			<div className="cardContainer">
				{fullMoviesList.map((movie, index) => {
					return (
						<TinderCard
							ref={childRefs[index]}
							className="swipe"
							key={`movie-card-${movie.imdbID}`}
							onSwipe={(dir) => swiped(dir, movie.Title, index)}
							onCardLeftScreen={() => outOfFrame(movie.Title, index)}
							preventSwipe={['up']}
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
			<a
				uk-toggle="target: #modal"
				className="uk-icon-button open-modal"
				uk-icon="file-text"
				href=""
			></a>
			<div
				className="uk-modal-full uk-background-secondary uk-width-1-1 uk-height-1-1"
				id="modal"
				uk-modal="true"
			>
				<div className="uk-modal-dialog">
					<a
						className="uk-modal-close-default uk-close uk-icon-button uk-position-small uk-position-top-right"
						href=""
						uk-close="true"
					></a>
					<div className="uk-width-1-1 uk-background-secondary">
						<div className="uk-width-1-1 uk-height-small uk-cover-container">
							<img
								src={fullMoviesList[1]?.Poster}
								alt=""
								uk-cover
								className="uk-width-1-1"
							/>
							<div class="uk-overlay uk-overlay-primary uk-position-bottom">
								<h2>{fullMoviesList[1]?.Title}</h2>
							</div>
						</div>
						<dl class="uk-description-list uk-padding-small uk-text-small uk-margin-remove uk-padding-small">
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
		</div>
	);
};
export default Swiper;
