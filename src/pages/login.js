import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';

export default function Login() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = () => {};

  useEffect(() => {
    document.title = 'Login - FabGram';
  }, []);
  return (
    <div className="container flex mx-auto max-m-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/demo.webp"
          alt="FabGram Demo"
          className="max-w-full"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <p>I will be the form</p>
      </div>
    </div>
  );
}
