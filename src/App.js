import React, {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
import ProtectedRoute from './helpers/protected.route';
import IsUserLoggedIn from './helpers/is-user-logged-in';

// allows splitting of huge bundles into chunks
const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route
              path={ROUTES.LOGIN}
              element={
                <IsUserLoggedIn user={user}>
                  <Login />
                </IsUserLoggedIn>
              }
            />
            <Route
              path={ROUTES.SIGN_UP}
              element={
                <IsUserLoggedIn user={user}>
                  <Signup />
                </IsUserLoggedIn>
              }
            />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
