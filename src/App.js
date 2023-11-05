import React, {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import * as ROUTES from './constants/routes';

// allows splitting of huge bundles into chunks
const Login = lazy(() => import('./pages/login'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>} />
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
