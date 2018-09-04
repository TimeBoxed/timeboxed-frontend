import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import TaskItem from '../material-ui/task-item';
import * as profileActions from '../../actions/profile';
import * as taskActions from '../../actions/task';
import MaterialUITaskForm from '../material-ui/task-form';
// import autobind from '../../utils/auto-bind';

// -------------------------------------------------------------------------------------------------
// MATERIAL UI COMPONENTS
// -------------------------------------------------------------------------------------------------
import AddFAB from '../material-ui/floating-action-button';

import './dashboard.scss';
import * as preferencesActions from '../../actions/preferences';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    width: '100%',
  },
  completedContainer: {
    width: '100%',
    textDecoration: 'line-through',
    opacity: '.5',
    padding: 0,
  },
  showCompleted: {
    display: 'block',
  },
  hideCompleted: {
    display: 'none',
  },
  dashboardPage: {
    display: 'flex',
    justifyContent: 'center',
  },
  listHolder: {
    width: '600px',
  },
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
      completedTasksShow: false,
    };
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchUserProfile()
        .then(() => {
          return this.props.pFetchAllTasks();
        })
        .then(() => {
          return this.props.pFetchUserPreferences();
        });
    }
  }

  handleTaskComplete = (task) => {
    this.props.pCreateTask(task);
    this.setState({ openForm: false });
  };

  handleFormOpen = () => {
    this.setState(prevState => ({ openForm: !prevState.openForm }));
  };

  handleShowHideTasks = () => {
    this.setState(prevState => ({ completedTasksShow: !prevState.completedTasksShow }));
  };

  handleStatusChange = (task, completed) => {
    this.props.pUpdateTaskStatus(task, completed);
  };

  render() {
    const { tasks, classes } = this.props;
    const completedTasks = this.state.completedTasksShow ? 'Hide' : 'Show'; 
    const completedTasksClass = this.state.completedTasksShow ? 'show-completed' : 'hide-completed';

    return (
      <div className={classes.dashboardPage}>
        <div className={classes.listHolder}>
          <MaterialUITaskForm 
            show={this.state.openForm} 
            onComplete={this.handleTaskComplete} 
            handleFormOpen={this.handleFormOpen} 
            task={null}
          />
          <List className={classes.container} component='div'>
            {tasks.length > 0 
            && tasks.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
              .filter(taskToDo => (taskToDo.completed === false))
              .map(task => (
              <TaskItem key={task._id} task={task} onComplete={this.props.pUpdateTaskStatus} />
              ))}
          </List>
          <div className='show-hide-tasks'>
            <Typography gutterBottom variant='subheading' onClick={this.handleShowHideTasks}>{completedTasks} Completed Tasks</Typography>
          </div>
          <div className={completedTasksClass}>
            <List className={classes.completedContainer} component='div'>
              {tasks.length > 0 
              && tasks.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                .filter(taskToDo => (taskToDo.completed === true))
                .map(task => (
                <TaskItem key={task._id} task={task} onComplete={this.handleStatusChange}/>
                ))}
            </List>
          </div>
          <AddFAB activate={this.handleFormOpen}/>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  pFetchUserProfile: PropTypes.func,
  pFetchUserPreferences: PropTypes.func,
  pCreateTask: PropTypes.func,
  pFetchAllTasks: PropTypes.func,
  pUpdateTaskStatus: PropTypes.func,
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
  pFetchUserPreferences: () => dispatch(preferencesActions.preferencesFetchRequest()),
  pUpdateTaskStatus: (task, completed) => dispatch(taskActions.taskUpdateStatus(task, completed)),
});

export default compose(
  withStyles(styles, { name: 'Dashboard' }),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard);
