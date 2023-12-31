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

// check if username exists
export async function doesUsernameExist(username) {
  const usersRef = collection(firebase, 'users');

  const q = query(usersRef, where('username', '==', username));

  const result = await getDocs(q);

  return result.docs.length > 0;
}

// get a user from firebase using the username
export async function getUserByUsername(username) {
  const usersRef = collection(firebase, 'users');

  const q = query(usersRef, where('username', '==', username));

  const result = await getDocs(q);

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
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

// get photos of followed users
export async function getPhotos(userId, following) {
  const photosRef = collection(firebase, 'photos');

  const q = query(photosRef, where('userId', 'in', following));

  const result = await getDocs(q);

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    }),
  );

  return photosWithUserDetails;
}

// get user photos by username
export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);

  const photosRef = collection(firebase, 'photos');

  const q = query(photosRef, where('userId', '==', user.userId));

  const result = await getDocs(q);

  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return photos;
}

// check if user logged in user is following profile
export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId,
) {
  const usersRef = collection(firebase, 'users');

  const q = query(
    usersRef,
    where('username', '==', loggedInUserUsername),
    where('following', 'array-contains', profileUserId),
  );

  const result = await getDocs(q);

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

// toggle follow user
export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId,
) {
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile,
  );
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile,
  );
}
