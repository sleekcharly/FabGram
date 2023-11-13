import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue, auth } from './lib/firebase';
import './styles/app.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue, auth }}>
    <SkeletonTheme baseColor="#d6d2d2" highlightColor="#c9c5c5">
      <App />
    </SkeletonTheme>
  </FirebaseContext.Provider>,
);
