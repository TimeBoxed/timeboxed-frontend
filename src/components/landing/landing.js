import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as profileActions from '../../actions/profile';
import TaskForm from '../task-form/task-form';
import autobind from '../../utils/auto-bind';

// -------------------------------------------------------------------------------------------------
// MATERIAL UI COMPONENTS
// -------------------------------------------------------------------------------------------------
import AddFAB from '../material-ui/floating-action-button';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: {},
    };
    autobind.call(this, Landing);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchUserProfile();
    }
  }

  render() {
    return (
      // TODO: task action to create new task to pass as prop
      <div className='landing-page'>
        {/* // TODO: task action to create new task to pass as prop     onComplete={} */}
        <TaskForm />
        <AddFAB/>
      </div>
    );
  }
}

Landing.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
