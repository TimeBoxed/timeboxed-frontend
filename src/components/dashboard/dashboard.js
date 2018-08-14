import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as profileActions from '../../actions/profile';
import * as taskActions from '../../actions/task';
import TaskForm from '../task-form/task-form';
import autobind from '../../utils/auto-bind';

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
      this.props.pFetchUserProfile()
        .then(() => {
          return this.props.pFetchAllTasks();
        });
    }
  }

  render() {
    const { tasks } = this.props;
    return (
      <div className='dashboard-page'>
          <div>
          <TaskForm onComplete={this.props.pCreateTask}/>
          {tasks.length > 0 
          && tasks.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)).map(task => (
              <p key={task._id}>{task.title}</p>
          ))
          }
          <AddFAB/>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  pFetchUserProfile: PropTypes.func,
  pCreateTask: PropTypes.func,
  pFetchAllTasks: PropTypes.func,
  tasks: PropTypes.array,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  pCreateTask: task => dispatch(taskActions.taskCreateRequest(task)),
  pFetchAllTasks: profile => dispatch(taskActions.fetchAllTasks(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
