import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pathCheck from '../../utils/path-check';

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

    const destinationRoute = (!token) ? ROUTES.LANDING : pathCheck(pathname);

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
