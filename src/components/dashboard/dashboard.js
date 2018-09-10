import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  listHolder: {
    width: '600px',
    paddingTop: '80px',
  },
  deleteButton: {
    width: 420,
    height: 80,
    backgroundColor: '#0B5999',
    display: 'block',
    margin: '0px auto',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'fixed',
      bottom: '0rem',
      left: '0rem',
      width: '100%',
      borderRadius: 0,
      // float: 'left',
      // margin: theme.spacing.unit,
    },
  },
  deleteText: {
    color: '#FAFAFA',
  },
  buttonDiv: {
    width: '100%',
    marginTop: 90,
  },
  fab: {
    float: 'left',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'fixed',
      bottom: '1rem',
      left: '1rem',
      float: 'left',
      margin: theme.spacing.unit,
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
      completedTasksShow: false,
      editingTasks: false,
      tasksForDeletion: [],
    };
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchUserProfile()
        .then(() => {
          return this.props.pFetchUserPreferences();
        })
        .then(() => {
          return this.props.pFetchAllTasks();
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

  handleEditing = () => {
    this.setState(prevState => ({ editingTasks: !prevState.editingTasks }));
  }

  handleDelete = () => {
    this.setState(prevState => ({ editingTasks: !prevState.editingTasks }));
    this.props.pTasksDeleteRequest(this.state.tasksForDeletion)
      .then(() => {
        return this.props.pFetchAllTasks();
      }); 
  }

  handleSelect = (task) => {
    const { tasksForDeletion } = this.state;
    const taskIndex = tasksForDeletion.indexOf(task);
    const newTasksForDeletion = [...tasksForDeletion];

    if (taskIndex === -1) {
      newTasksForDeletion.push(task);
    } else {
      newTasksForDeletion.splice(taskIndex, 1);
    }

    this.setState({ tasksForDeletion: newTasksForDeletion });
  }

  render() {
    const { tasks, classes, preferences } = this.props;
    const completedTasks = this.state.completedTasksShow ? 'Hide' : 'Show'; 
    const completedTasksClass = this.state.completedTasksShow ? 'show-completed' : 'hide-completed';

    return (
      <div className={classes.dashboardPage}>

        <div className={classes.listHolder}>
        {this.state.editingTasks && <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleEditing}>Cancel</Button>}
        <div>
          {preferences 
            && <MaterialUITaskForm 
            show={this.state.openForm} 
            onComplete={this.handleTaskComplete} 
            handleFormOpen={this.handleFormOpen} 
            task={null}
            timeEstimateProp={preferences.taskLengthDefault}
          />}
          </div>
          <List className={classes.container} component='div'>
            {tasks.length > 0 
            && tasks.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
              .filter(taskToDo => (taskToDo.completed === false))
              .map(task => (
              <TaskItem 
                key={task._id} 
                task={task} 
                onComplete={this.handleStatusChange} 
                editingTasks={this.state.editingTasks} 
                onSelect={this.handleSelect}
                selected={false}
              />
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
                <TaskItem 
                  key={task._id} 
                  task={task} 
                  onComplete={this.handleStatusChange}
                  editingTasks={this.state.editingTasks} 
                  onSelect={this.handleSelect}
                  selected={false}
                />
                ))}
            </List>
          </div>
          <div className={classes.buttonDiv}>
          {this.state.editingTasks 
            ? <Button variant="contained" color="primary" className={classes.deleteButton} onClick={this.handleDelete}>
              <Delete/>
              <Typography className={classes.deleteText}>Delete</Typography>
            </Button>
            : <div><Button 
                onClick={this.handleEditing} 
                variant="fab" 
                color="primary"  
                aria-label="edit" 
                className={classes.fab}
              >
              <EditIcon />
            </Button>
            <AddFAB activate={this.handleFormOpen}/> 
            </div>
          }
          </div>
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
  pTasksDeleteRequest: PropTypes.func,
  tasks: PropTypes.array,
  preferences: PropTypes.object,
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
  tasks: state.tasks,
  preferences: state.preferences,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  pCreateTask: task => dispatch(taskActions.taskCreateRequest(task)),
  pFetchAllTasks: () => dispatch(taskActions.fetchAllTasks()),
  pFetchUserPreferences: () => dispatch(preferencesActions.preferencesFetchRequest()),
  pUpdateTaskStatus: (task, completed) => dispatch(taskActions.taskUpdateStatus(task, completed)),
  pTasksDeleteRequest: tasks => dispatch(taskActions.tasksDeleteRequest(tasks)),
});

export default compose(
  withStyles(styles, { name: 'Dashboard' }),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard);
