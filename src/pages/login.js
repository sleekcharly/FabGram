import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';

export default function Login() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  // set component states
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // set invalid if password or emailAddress is not set
  const isInvalid = password === '' || emailAddress === '';

  // actions
  const handleLogin = () => {};

  // set page title on load
  useEffect(() => {
    document.title = 'Login - Fabgram';
  }, []);

  return <p>I am the login page</p>;
}
