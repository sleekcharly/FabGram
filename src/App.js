import React, {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import * as ROUTES from './constants/routes';

// allows splitting of huge bundles into chunks
const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<Signup />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
