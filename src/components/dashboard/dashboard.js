import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import TaskItem from '../material-ui/task-item';
import * as profileActions from '../../actions/profile';
import * as taskActions from '../../actions/task';
import TaskForm from '../task-form/task-form';
// import autobind from '../../utils/auto-bind';

// -------------------------------------------------------------------------------------------------
// MATERIAL UI COMPONENTS
// -------------------------------------------------------------------------------------------------
import AddFAB from '../material-ui/floating-action-button';

import './dashboard.scss';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    maxWidth: 360,
  },
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
    };
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchUserProfile()
        .then(() => {
          return this.props.pFetchAllTasks();
        });
    }
  }

  handleTaskComplete = () => {
    this.props.pCreateTask();
    this.setState({ openForm: false });
  }

  handleFormOpen = () => {
    this.setState(prevState => ({ openForm: !prevState.openForm }));
  }

  render() {
    const { tasks, classes } = this.props;
    return (
      <div className='dashboard-page'>
        <TaskForm show={this.state.openForm} onComplete={this.props.pCreateTask}/>
        <List className={classes.container} component='div'>
          {tasks.length > 0 
          && tasks.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)).map(task => (
            <TaskItem key={task._id} task={task} onComplete={this.props.pUpdateTask} />
          ))}
        </List>
        <AddFAB activate={this.handleFormOpen}/>
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
  classes: PropTypes.object,
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

export default compose(
  withStyles(styles, { name: 'Dashboard' }),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard);
