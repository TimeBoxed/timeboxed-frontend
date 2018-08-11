import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ROUTES from '../../routes';

let redirect = false;
let destinationRoute = null;

class AuthRedirect extends Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      redirect = true;
      destinationRoute = '/';
      this.props.history.push(ROUTES.LANDING);
    }
  }

  render() {
    const toLoginView = (
      <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/welcome&scope=profile%20email%20https://www.googleapis.com/auth/calendar&prompt=consent&response_type=code&client_id=30945685942-2peaeakg0megqic4lp8d4ffu79p520lm.apps.googleusercontent.com">
      <button id='sign-in-button'>SIGN IN WITH GOOGLE</button>
      </a>
    );
    return (
      <div>
        { redirect ? <Redirect to={destinationRoute}/> : toLoginView }
      </div>
    );
  }
}

AuthRedirect.propTypes = {
  loggedIn: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});


export default connect(mapStateToProps)(AuthRedirect);
