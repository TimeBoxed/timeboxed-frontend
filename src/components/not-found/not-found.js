import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from '../../routes';

class NotFound extends React.Component {
  render() {
    return (
        <div>
          <p>Not found page</p>
          <Link to={ROUTES.DASHBOARD} >Get back</Link>
        </div>
    );
  }
}

NotFound.propTypes = {
  location: PropTypes.object,
};

export default NotFound;
