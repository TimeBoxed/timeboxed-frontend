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
  topButtonsDiv: {
    width: '50%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  button: {
    width: 100,
  },
  blueButton: {
    width: 100,
    backgroundColor: '#0B5999',
  },
  deleteButton: {
    width: '35%',
    height: 80,
    backgroundColor: '#0B5999',
    display: 'block',
    position: 'fixed',
    bottom: '1%',
    left: '33%',
    margin: '0px auto',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'fixed',
      bottom: '0rem',
      left: '0rem',
      width: '100%',
      borderRadius: 0,
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
    display: 'none',
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
      taskOrder: [],
      completedTasks: [],
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
        })
        .then(() => {
          const orderedTasks = this.props.tasks.sort((a, b) => b.order - a.order);
          const tasksToComplete = orderedTasks.filter(task => task.completed === false);
          const completedTasks = orderedTasks.filter(task => task.completed === true);
          return this.setState({ taskOrder: tasksToComplete, completedTasks });
        });
    }
  }

  handleTaskComplete = (task) => {
    task.order = this.state.taskOrder.length > 0 
      ? this.state.taskOrder[this.state.taskOrder.length - 1].order + 1 
      : 1;

    this.props.pCreateTask(task)
      .then(() => {
        const orderedTasks = this.props.tasks.sort((a, b) => b.order - a.order);
        const tasksToComplete = orderedTasks.filter(t => t.completed === false);
        const completedTasks = orderedTasks.filter(t => t.completed === true);
        return this.setState({ openForm: false, taskOrder: tasksToComplete, completedTasks });
      });
  };

  handleFormOpen = () => {
    this.setState(prevState => ({ openForm: !prevState.openForm }));
  };

  handleShowHideTasks = () => {
    this.setState(prevState => ({ completedTasksShow: !prevState.completedTasksShow }));
  };

  handleStatusChange = (task, completed) => {
    let newOrder = 0;
    if (completed === false) {
      newOrder = this.state.taskOrder[this.state.taskOrder.length - 1].order + 1;
    }
    this.props.pUpdateTaskStatus(task, completed, newOrder)
      .then(() => {
        const orderedTasks = this.props.tasks.sort((a, b) => b.order - a.order);
        const tasksToComplete = orderedTasks.filter(t => t.completed === false);
        const completedTasks = orderedTasks.filter(t => t.completed === true);
        return this.setState({ openForm: false, taskOrder: tasksToComplete, completedTasks });
      });
  };

  handleEditing = () => {
    this.setState(prevState => ({ editingTasks: !prevState.editingTasks }));
  }

  handleDelete = () => {
    this.props.pTasksDeleteRequest(this.state.tasksForDeletion)
      .then(() => {
        const orderedTasks = this.props.tasks.sort((a, b) => b.order - a.order);
        const tasksToComplete = orderedTasks.filter(t => t.completed === false);
        const completedTasks = orderedTasks.filter(t => t.completed === true);
        return this.setState(prevState => ({ 
          editingTasks: !prevState.editingTasks,
          tasksForDeletion: [],
          taskOrder: tasksToComplete,
          completedTasks,
        }));
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
    const { classes, preferences } = this.props;
    const completedTasks = this.state.completedTasksShow ? 'Hide' : 'Show'; 
    const completedTasksClass = this.state.completedTasksShow ? 'show-completed' : 'hide-completed';

    return (
      <div className={classes.dashboardPage}>

        <div className={classes.listHolder}>
          
          {!this.state.editingTasks 
            ? <div className={classes.topButtonsDiv}>
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.blueButton} 
              onClick={this.handleEditing}>Edit</Button>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleFormOpen}>Add</Button>
            </div>
            : <Button 
            variant="contained" 
            color="primary" 
            className={classes.blueButton} 
            onClick={this.handleEditing}>Cancel</Button>
          }
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
            {this.state.taskOrder.length > 0 
            && this.state.taskOrder.sort((a, b) => a.order - b.order)
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
              {this.state.completedTasks.length > 0 
              && this.state.completedTasks
                .sort((a, b) => b.order - a.order)
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
  pUpdateTaskStatus: (task, completed, newOrder) => (
    dispatch(taskActions.taskUpdateStatus(task, completed, newOrder))
  ),
  pTasksDeleteRequest: tasks => dispatch(taskActions.tasksDeleteRequest(tasks)),
});

export default compose(
  withStyles(styles, { name: 'Dashboard' }),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard);
