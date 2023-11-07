import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser')),
  );

  // get firebase
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // if user is authenticated store user in localStorage
        localStorage.setItem('authUser', JSON.stringify(authUser));

        setUser(authUser);
      } else {
        // User is signed out
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    // unsubscribe from listener
    return () => listener();
  }, [auth]);

  return { user };
}
