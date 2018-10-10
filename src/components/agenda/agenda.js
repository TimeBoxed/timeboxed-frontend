import React from 'react';
import { noop } from 'lodash';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Refresh from '@material-ui/icons/Refresh';
import AgendaItem from '../material-ui/agenda-item';
import LoadSpinner from '../material-ui/load-spinner';
import * as profileActions from '../../actions/profile';
import * as taskActions from '../../actions/task';
import MenuAppBar from '../material-ui/menu-app-bar';
import { triggerSnackbar } from '../../actions/ui';

import * as preferencesActions from '../../actions/preferences';

import './agenda.scss';

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
  agendaPage: {
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
  agendaView: {
    width: '60%',
    margin: '0 0 0 15px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
});

class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
      completedTasksShow: false,
      editingTasks: false,
      taskOrder: [],
      completedTasks: [],
      loading: true,
    };
  }

  handleMountTaskFetch = () => {
    this.props.pFetchAllTasks()
      .then(() => {
        console.log(this.props.tasks);
        const withDueDates = this.props.tasks.filter(task => task.dueDate !== null);
        const noDueDate = this.props.tasks.filter(task => task.dueDate === null);
        const newOrder = withDueDates
          .sort((a, b) => a.dueDate - b.dueDate)
          .concat(noDueDate.sort((a, b) => a.order - b.order));
        console.log(withDueDates, noDueDate, newOrder);
        return this.setState({
          taskOrder: newOrder,
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


  render() {
    const { classes } = this.props;
    let completedTasks = ' Completed Tasks';
    completedTasks = this.state.completedTasksShow ? `Hide${completedTasks}` : `Show${completedTasks}`;
    const completedTasksClass = this.state.completedTasksShow ? 'show-completed' : 'hide-completed';

    if (this.state.loading) {
      return <LoadSpinner/>;
    }

    return (
      <React.Fragment>
        <MenuAppBar editing={this.state.editingTasks} onComplete={this.handleEditing}/>
        <div className={classes.agendaPage}>
          <div className={classes.listHolder}>
            <div className={classes.agendaView}>
              {
                (!this.state.editingTasks && this.state.taskOrder.length > 0)
                  && <List className={classes.container} component='div'>
                    {
                      this.state.taskOrder.sort((a, b) => a.order - b.order)
                        .map(task => (
                          <AgendaItem
                            key={task._id}
                            task={task}
                            onComplete={this.handleStatusChange}
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
                          <AgendaItem
                            key={task._id}
                            task={task}
                            onComplete={this.handleStatusChange}
                          />))
                  }
                </List>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Agenda.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  pFetchUserProfile: PropTypes.func,
  pFetchUserPreferences: PropTypes.func,
  pFetchAllTasks: PropTypes.func,
  pUpdateTaskStatus: PropTypes.func,
  tasks: PropTypes.array,
  completedTasks: PropTypes.array,
  preferences: PropTypes.object,
  classes: PropTypes.object,
  triggerSnackbar: PropTypes.func,
};

Agenda.defaultProps = {
  profile: {},
  loggedIn: false,
  pFetchUserProfile: noop,
  pFetchUserPreferences: noop,
  pFetchAllTasks: noop,
  pUpdateTaskStatus: noop,
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
  pFetchAllTasks: () => dispatch(taskActions.fetchAllTasks()),
  pFetchUserPreferences: () => dispatch(preferencesActions.preferencesFetchRequest()),
  pUpdateTaskStatus: (task, completed, newOrder) => (
    dispatch(taskActions.taskUpdateStatus(task, completed, newOrder))
  ),
  triggerSnackbar: (type, message) => dispatch(triggerSnackbar(type, message)),
});

export default compose(
  withStyles(styles, { name: 'Agenda' }),
  connect(mapStateToProps, mapDispatchToProps),
)(Agenda);
