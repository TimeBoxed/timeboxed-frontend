import React from 'react';
import { noop } from 'lodash';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Reorder from '@material-ui/icons/Reorder';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TaskItem from '../material-ui/task-item';
import LoadSpinner from '../material-ui/load-spinner';
import * as profileActions from '../../actions/profile';
import * as taskActions from '../../actions/task';
import MenuAppBar from '../material-ui/menu-app-bar';
import SideTaskForm from '../material-ui/side-task-form';
import NewTaskForm from '../material-ui/new-task-form';
import { triggerSnackbar } from '../../actions/ui';

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
    justifyContent: 'start',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  listHolder: {
    width: '100%',
    paddingTop: 80,
    display: 'flex',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('xs')]: {
      minWidth: 320,
      paddingTop: 50,
    },
  },
  dashboardLeft: {
    width: '60%',
    margin: '0 0 0 15px',
    borderRight: '1px solid #E4E4E4',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  dashboardRight: {
    width: '40%',
    margin: '0 15px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
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
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  deleteButton: {
    width: '40%',
    height: 80,
    backgroundColor: '#0B5999',
    display: 'block',
    position: 'fixed',
    bottom: '1rem',
    left: '10%',
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
    display: 'block',
    position: 'fixed',
    bottom: '1rem',
    left: '27.5%',
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
  editText: {
    height: 37,
    paddingTop: 20,
    color: '#9e9e9e',
    fontSize: 16,
  },
  mobileDetailView: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      padding: 10,
    },
  },
  drawerDiv: {
    padding: 10,
  },
  drawerArrow: {
    float: 'left',
    margin: 5,
    width: 50,
    border: '1px solid #e6e6e6',
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
      orderToEdit: [],
      loading: true,
      selectedTask: {},
      drawerOpen: false,
    };
  }

  handleMountTaskFetch = () => {
    this.props.pFetchAllTasks()
      .then(() => {
        return this.setState({
          taskOrder: this.props.tasks ? this.props.tasks.sort((a, b) => a.order - b.order) : [],
          completedTasks: this.props.completedTasks || [],
          loading: false,
        });
      });
  };

  handleMountPreferencesFetch = () => {
    this.props.pFetchUserPreferences()
      .then(() => {
        return this.handleMountTaskFetch();
      });
  };

  handleMountProfileFetch = () => {
    this.props.pFetchUserProfile()
      .then(() => {
        return this.handleMountPreferencesFetch();
      });
  };

  componentDidMount() {
    if (this.props.loggedIn) {
      if (!this.props.profile) {
        return this.handleMountProfileFetch();
      }
      if (!this.props.preferences) {
        return this.handleMountPreferencesFetch();
      }
      if (!this.props.tasks) {
        return this.handleMountTaskFetch();
      }
    }
    return this.setState({
      taskOrder: this.props.tasks ? this.props.tasks.sort((a, b) => a.order - b.order) : [],
      completedTasks: this.props.completedTasks || [],
      loading: false,
    });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      taskOrder: arrayMove(this.state.taskOrder, oldIndex, newIndex),
    });
    this.props.pTasksBulkUpdate(this.state.taskOrder);
  };

  handleTaskComplete = (task) => {
    this.setState({ openForm: false });
    task.order = this.state.taskOrder.length > 0
      ? this.state.taskOrder[this.state.taskOrder.length - 1].order + 1
      : 0;

    this.props.pCreateTask(task)
      .then(() => {
        return this.setState({
          taskOrder: this.props.tasks.sort((a, b) => a.order - b.order),
          completedTasks: this.props.completedTasks,
          selectedTask: this.props.tasks[this.props.tasks.length - 1],
          drawerOpen: true,
        });
      });
  };

  handleFormOpen = () => {
    this.setState(prevState => ({ openForm: !prevState.openForm }));
  };

  handleCloseDrawer = () => {
    this.setState({ selectedTask: {}, drawerOpen: false });
  }

  handleShowHideTasks = () => {
    this.setState(prevState => ({ completedTasksShow: !prevState.completedTasksShow }));
  };

  handleStatusChange = (task, completed) => {
    this.setState({ openForm: false });
    let newOrder = 0;
    if (completed === false) {
      newOrder = this.state.taskOrder.length > 0
        ? this.state.taskOrder[this.state.taskOrder.length - 1].order + 1
        : newOrder;
    }
    this.props.pUpdateTaskStatus(task, completed, newOrder)
      .then(() => {
        this.props.triggerSnackbar('success', completed ? 'Task completed' : 'Task reopened');
        return this.setState({
          taskOrder: this.props.tasks.sort((a, b) => a.order - b.order),
          completedTasks: this.props.completedTasks,
          selectedTask: completed ? {} : this.props.tasks[this.props.tasks.length - 1],
        });
      })
      .catch(() => {
        this.props.triggerSnackbar('error');
      });
  };

  handleTaskDetail = (task) => {
    this.setState({ selectedTask: task, drawerOpen: true });
  }

  handleUpdateTask = (task) => {
    this.setState({ openForm: false });
    this.props.pTaskUpdateRequest(task)
      .then(() => {
        this.props.triggerSnackbar('success', 'Task updated');
        return this.setState({
          taskOrder: this.props.tasks.sort((a, b) => a.order - b.order),
          completedTasks: this.props.completedTasks,
        });
      })
      .catch(() => {
        this.props.triggerSnackbar('error');
      });
  };

  handleEditing = () => {
    this.setState(prevState => ({
      editingTasks: !prevState.editingTasks,
      taskOrder: this.props.tasks.sort((a, b) => a.order - b.order),
      completedTasks: this.props.completedTasks,
    }));
  };

  handleDelete = () => {
    this.props.pTasksDeleteRequest(this.state.tasksForDeletion)
      .then(() => {
        return this.setState(prevState => ({
          editingTasks: !prevState.editingTasks,
          tasksForDeletion: [],
          taskOrder: this.props.tasks.sort((a, b) => a.order - b.order),
          completedTasks: this.props.completedTasks,
          selectedTask: {},
        }));
      });
  };

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
  };

  render() {
    const { classes, preferences } = this.props;
    let completedTasks = ' Completed Tasks';
    completedTasks = this.state.completedTasksShow ? `Hide${completedTasks}` : `Show${completedTasks}`;
    const completedTasksClass = this.state.completedTasksShow ? 'show-completed' : 'hide-completed';

    const DragHandle = SortableHandle(() => <Reorder />);

    const SortableItem = SortableElement(({ value }) => (
      <TaskItem
        dragHandle={<DragHandle />}
        task={value}
        onComplete={this.handleStatusChange}
        editingTasks={this.state.editingTasks}
        onSelect={this.handleSelect}
        selected={this.state.tasksForDeletion.indexOf(value._id) !== -1}
      />
    ));

    const SortableList = SortableContainer(({ items }) => (
        <List className={classes.container} component='div'>
          {items
            .map((task, index) => (
              <SortableItem key={task._id} index={index} value={task} />
            ))}
        </List>
    ));

    if (this.state.loading) {
      return <LoadSpinner/>;
    }

    return (
      <React.Fragment>
        <MenuAppBar editing={this.state.editingTasks} onComplete={this.handleEditing}/>
        <div className={classes.dashboardPage}>
          <div className={classes.listHolder}>
            <div className={classes.dashboardLeft}>
              {
                (this.state.editingTasks && this.state.taskOrder.length > 0)
                  && <div>
                    <Typography className={classes.editText}>
                      Select tasks to delete or drag to reorder
                    </Typography>
                    <SortableList
                      items={this.state.taskOrder}
                      onSortEnd={this.onSortEnd}
                      useDragHandle={true}
                    />
                  </div>
              }
              {
                !this.state.editingTasks
                  && <NewTaskForm
                    show={true}
                    onComplete={this.handleTaskComplete}
                    timeEstimateProp={preferences.taskLengthDefault}
                    dependencies={null}
                  />
              }
              {
                (!this.state.editingTasks && this.state.taskOrder.length > 0)
                  && <List className={classes.container} component='div'>
                    {
                      this.state.taskOrder.sort((a, b) => a.order - b.order)
                        .map(task => (
                          <TaskItem
                            key={task._id}
                            task={task}
                            onComplete={this.handleStatusChange}
                            editingTasks={this.state.editingTasks}
                            onSelect={this.handleSelect}
                            onClickShowDetail={this.handleTaskDetail}
                            selected={false}
                            updateTask={this.handleUpdateTask}
                          />))
                    }
                    </List>
              }
              <div className='show-hide-tasks'>
                <Typography
                  gutterBottom variant='subheading'
                  onClick={this.handleShowHideTasks}
                >
                  {this.state.completedTasks.length > 0 && completedTasks}
                </Typography>
              </div>
              <div className={completedTasksClass}>
                <List className={classes.completedContainer} component='div'>
                  {
                    (this.state.completedTasks.length > 0)
                      && this.state.completedTasks
                        .sort((a, b) => b.order - a.order)
                        .map(task => (
                          <TaskItem
                            key={task._id}
                            task={task}
                            onComplete={this.handleStatusChange}
                            editingTasks={this.state.editingTasks}
                            onSelect={this.handleSelect}
                            selected={false}
                            updateTask={this.handleUpdateTask}
                          />))
                  }
                </List>
              </div>
              <div className={classes.buttonDiv}>
              {
                this.state.editingTasks
                  ? <Button variant="contained" color="primary" className={classes.deleteButton} onClick={this.handleDelete}>
                      <Delete/>
                      <Typography className={classes.deleteText}>Done</Typography>
                    </Button>
                  : <div>
                      <Button
                        onClick={this.handleEditing}
                        variant="fab"
                        color="primary"
                        aria-label="edit"
                        className={classes.fab}
                      >
                        <EditIcon />
                      </Button>
                    </div>
              }
              </div>
              </div>
              <div className={classes.dashboardRight}>
                {
                  this.state.selectedTask && this.state.selectedTask.title
                    ? <SideTaskForm
                      show={true}
                      task={this.state.selectedTask}
                      onComplete={this.handleTaskUpdate}
                      timeEstimateProp={this.state.selectedTask.timeEstimate}
                      dependencies={this.state.selectedTask.dependencies}
                    />
                    : <Typography>Click on a task to view details</Typography>
                }
              </div>
              {
                (
                  this.state.selectedTask
                  && this.state.selectedTask.title
                  && window.innerWidth < 600
                )
                  && <Drawer
                      anchor="right"
                      className={classes.mobileDetailView}
                      open={this.state.drawerOpen}
                      onClose={this.handleCloseDrawer}
                      >
                        <div className={classes.drawerDiv}>
                          <ArrowBack
                            className={classes.drawerArrow}
                            onClick={this.handleCloseDrawer}
                          />
                          <SideTaskForm
                            show={true}
                            task={this.state.selectedTask}
                            onComplete={this.handleTaskUpdate}
                            timeEstimateProp={this.state.selectedTask.timeEstimate}
                            dependencies={this.state.selectedTask.dependencies}
                          />
                        </div>
                  </Drawer>
              }
          </div>
        </div>
      </React.Fragment>
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
  pTaskUpdateRequest: PropTypes.func,
  pTasksBulkUpdate: PropTypes.func,
  tasks: PropTypes.array,
  completedTasks: PropTypes.array,
  preferences: PropTypes.object,
  classes: PropTypes.object,
  triggerSnackbar: PropTypes.func,
};

Dashboard.defaultProps = {
  profile: {},
  loggedIn: false,
  pFetchUserProfile: noop,
  pFetchUserPreferences: noop,
  pCreateTask: noop,
  pFetchAllTasks: noop,
  pUpdateTaskStatus: noop,
  pTasksDeleteRequest: noop,
  pTaskUpdateRequest: noop,
  pTasksBulkUpdate: noop,
  classes: {},
  triggerSnackbar: noop,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
  tasks: state.tasks,
  completedTasks: state.completedTasks,
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
  pTaskUpdateRequest: task => dispatch(taskActions.taskUpdateRequest(task)),
  pTasksBulkUpdate: tasks => dispatch(taskActions.tasksBulkUpdateRequest(tasks)),
  triggerSnackbar: (type, message) => dispatch(triggerSnackbar(type, message)),
});

export default compose(
  withStyles(styles, { name: 'Dashboard' }),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard);
