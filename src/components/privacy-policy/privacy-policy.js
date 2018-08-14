import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as profileActions from '../../actions/profile';

// -------------------------------------------------------------------------
// MATERIAL UI IMPORTS
// -------------------------------------------------------------------------
import PrivacyDialog from '../material-ui/privacy-dialog';

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privacyPolicySigned: false,
    };
  }
  
  render() {
    return (
      <div>
        <PrivacyDialog/>
      </div>
    );
  }
}

PrivacyPolicy.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  pFetchUserProfile: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
});

export default PrivacyPolicy;
