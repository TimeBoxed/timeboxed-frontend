import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ROUTES from '../../routes';

// let redirect = false;
// let destinationRoute = null;

class AuthRedirect extends Component {
  // componentDidMount() {
  //   if (this.props.loggedIn) {
  //     console.log('logged in on auth redirect');
  //     redirect = true;
  //     destinationRoute = '/';
  //     this.props.history.push(ROUTES.DASHBOARD);
  //   }
  // }

  render() {
    const { location, token } = this.props;
    const { pathname } = location;
    let destinationRoute = null;

    switch (pathname) {
      case ROUTES.LANDING:
        if (token) destinationRoute = ROUTES.DASHBOARD;
        break;
      default:
        if (!token) destinationRoute = ROUTES.LANDING;
        break;
    }
    return (
      <div>
        { destinationRoute ? <Redirect to={destinationRoute}/> : undefined }
      </div>
    );
  }
}

AuthRedirect.propTypes = {
  token: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: !!state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
