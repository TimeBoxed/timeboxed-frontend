import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from '../../routes';
import './not-found.scss';

const NotFound = () => (
    <div className='not-found'>
      <p>Not found page</p>
      <Link to={ROUTES.DASHBOARD}>Get back</Link>
    </div>
);

NotFound.propTypes = {
  location: PropTypes.object,
};

export default NotFound;
