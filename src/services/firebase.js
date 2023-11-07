import { firebase } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function doesUsernameExist(username) {
  const usersRef = collection(firebase, 'users');

  const q = query(usersRef, where('username', '==', username));

  const result = await getDocs(q);

  return result.docs.length > 0;
}
