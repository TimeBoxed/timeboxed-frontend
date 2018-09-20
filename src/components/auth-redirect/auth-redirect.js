import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pathCheck from '../../utils/path-check';

class AuthRedirect extends Component {
  render() {
    const { location, token } = this.props;
    const { pathname } = location;

    const destinationRoute = pathCheck(pathname, !!token);
    
    return (
      <div>
        { (destinationRoute && destinationRoute !== pathname)
          && <Redirect to={destinationRoute}/> }
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
