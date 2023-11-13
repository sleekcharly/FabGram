import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function IsUserLoggedIn({ user, children }) {
  if (!user) {
    return children;
  }

  return <Navigate to={ROUTES.DASHBOARD} replace />;
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
