import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from './firebase';
// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(app);
export const createUser = async (uid) => {
	try {
		const userFile = await setDoc(
			doc(firestore, 'users', uid),
			{
				likedMovies: [],
				dislikedMovies: [],
				notWatchedMovies: [],
				blockedMovies: [],
				watchList: [],
			},
			{ merge: true }
		);

		console.log('User added');
	} catch (e) {
		console.error(e);
	}
};
export const readUser = async (uid) => {
	const docRef = doc(firestore, 'users', uid);
	const docSnap = await getDoc(docRef);
	return docSnap?.data();
};
