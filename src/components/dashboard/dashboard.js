import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as profileActions from '../../actions/profile';
import TaskForm from '../task-form/task-form';
import autobind from '../../utils/auto-bind';
import GoogleLogo from '../../assets/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg';
// -------------------------------------------------------------------------------------------------
// MATERIAL UI COMPONENTS
// -------------------------------------------------------------------------------------------------
import AddFAB from '../material-ui/floating-action-button';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    autobind.call(this, Dashboard);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      console.log('logged in on dashboard');
      this.props.pFetchUserProfile();
    }
  }

  render() {
    // const notLoggedIn = (
    //   <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/welcome&scope=profile%20email%20https://www.googleapis.com/auth/calendar&prompt=consent&response_type=code&client_id=30945685942-2peaeakg0megqic4lp8d4ffu79p520lm.apps.googleusercontent.com">
    //   <button id='sign-in-button'><GoogleLogo id='googleLogo'/>SIGN IN WITH GOOGLE</button>
    //   </a>
    // );
    return (
      // TODO: task action to create new task to pass as prop
      <div className='dashboard-page'>
        {/* // TODO: task action to create new task to pass as prop     onComplete={} */}
        {/* {!this.props.loggedIn ? notLoggedIn  */}
          {/* :  */}
          <div>
          <TaskForm />
          <AddFAB/>
        </div>
        {/* } */}
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  pFetchUserProfile: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
