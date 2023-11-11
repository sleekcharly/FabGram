import { firebase } from '../lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';

export async function doesUsernameExist(username) {
  const usersRef = collection(firebase, 'users');

  const q = query(usersRef, where('username', '==', username));

  const result = await getDocs(q);

  return result.docs.length > 0;
}

// get user information from firebase
export async function getUserByUserId(userId) {
  const userRef = collection(firebase, 'users');

  const q = query(userRef, where('userId', '==', userId));

  const result = await getDocs(q);

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

// get suggested profiles from firebase
export async function getSuggestedProfiles(userId, following) {
  const userRef = collection(firebase, 'users');

  const q = query(userRef, limit(10));

  const result = await getDocs(q);

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId),
    );
}

// update logged in user following
export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile,
) {
  const userRef = doc(firebase, 'users', loggedInUserDocId);

  isFollowingProfile
    ? await updateDoc(userRef, { following: arrayRemove(profileId) })
    : await updateDoc(userRef, { following: arrayUnion(profileId) });
}

// update followers array of followed user
export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile,
) {
  const userRef = doc(firebase, 'users', profileDocId);

  isFollowingProfile
    ? await updateDoc(userRef, { followers: arrayRemove(loggedInUserDocId) })
    : await updateDoc(userRef, { followers: arrayUnion(loggedInUserDocId) });
}
