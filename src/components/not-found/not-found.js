import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ListItemText } from '@material-ui/core';

import ROUTES from '../../routes';
import './not-found.scss';

const NotFound = () => (
    <div className='not-found'>
      <ListItemText>Oops! We can't seem to find the page you're looking for.</ListItemText>
      <Link to={ROUTES.DASHBOARD}>
        <Button style={{ border: '1px solid gray' }}>Return to Dashboard</Button>
      </Link>
    </div>
);

export default NotFound;
