import React from 'react';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import * as taskActions from '../../actions/task';

const styles = () => ({
  formControl: {
    width: '50%',
  },
  notesField: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  timeAndDate: {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
  },
  button: {
    textAlign: 'center',
  },
  dependencies: {
    fontSize: 16,
    margin: '20px 0',
    backgroundColor: '#E6E6E6',

  },
  dependencyListItem: {
    wordWrap: 'break-word',
    height: '1.8em',
    lineHeight: '1.8em',
    overflow: 'hidden',
  },
  title: {
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '1.5em',
    lineHeight: '1.8em',
    textAlign: 'left',
  },
  timeEstimate: {
    textAlign: 'right',
    minWidth: 50,
    padding: 0,
    color: '#B5B5B5',
    fontWeight: 100,
  },
});

class SideTaskForm extends React.Component {
  state = {
    open: this.props.show,
    title: this.props.task ? this.props.task.title : '',
    notes: this.props.task.notes,
    timeEstimate: this.props.task.timeEstimate || this.props.preferences.taskLengthDefault,
    dueDate: this.props.task.dueDate || '',
    dependencies: this.props.task.dependencies,
  };

  componentDidMount() {
    this.handleUpdateProps();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.task !== this.props.task) {
      this.handleUpdateProps();
    }
  }

  handleUpdateProps = () => {
    this.setState({
      open: this.props.show,
      title: this.props.task ? this.props.task.title : '',
      timeEstimate: this.props.task.timeEstimate,
      dueDate: this.props.task.dueDate ? this.props.task.dueDate.slice(0, 10) : '',
      notes: this.props.task.notes,
      dependencies: this.props.task.dependencies,
    });
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
    if (id === 'dueDate') {
      const taskToUpdate = this.props.task;
      taskToUpdate[id] = value;
      return this.props.taskUpdateRequest(taskToUpdate);
    }
    return undefined;
  };

  handleSelectDependency = (e) => {
    const { value } = e.target;
    const newDependencies = this.state.dependencies;
    if (newDependencies.indexOf(value) > -1) {
      const dependenciesToUpdate = newDependencies.filter(item => item !== value);
      const taskToUpdate = this.props.task;
      taskToUpdate.dependencies = dependenciesToUpdate;
      return this.props.taskUpdateRequest(taskToUpdate)
        .then(() => {
          return this.setState({ dependencies: this.props.task.dependencies });
        });
    }
    newDependencies.push(value);
    const taskToUpdate = this.props.task;
    taskToUpdate.dependencies = newDependencies;
    return this.props.taskUpdateRequest(taskToUpdate)
      .then(() => {
        return this.setState({ dependencies: this.props.task.dependencies });
      });
  }

  handleUpdateTitle = (event) => {
    event.preventDefault();
    const taskToUpdate = this.props.task;
    taskToUpdate.title = this.state.title;
    return this.props.taskUpdateRequest(taskToUpdate);
  };

  handleUpdateNotes = (event) => {
    event.preventDefault();
    const taskToUpdate = this.props.task;
    taskToUpdate.notes = this.state.notes;
    return this.props.taskUpdateRequest(taskToUpdate);
  };

  handleChangeTimeEstimate = (e) => {
    const { value } = e.target;
    this.setState({ timeEstimate: value });
    const taskToUpdate = this.props.task;
    taskToUpdate.timeEstimate = value;
    return this.props.taskUpdateRequest(taskToUpdate);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.handleClose();
    return this.props.onComplete({
      ...this.state,
      _id: this.props.task._id,
      dependencies: this.state.dependencies,
    });
  };

  handleCreateTask = (event) => {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState({
      open: false,
      title: '',
      timeEstimate: this.props.preferences.taskLengthDefault,
      dateSelect: false,
      dueDate: null,
    });
  };

  handleUpdateDependencies = (e) => {
    this.setState({ dependencies: e.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <form onSubmit={this.handleUpdateTitle} >
          <TextField
            margin="dense"
            id="title"
            label="Task title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            onBlur={this.handleUpdateTitle}
            fullWidth
          />
        </form>
        <div className={classes.timeAndDate}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="task-time">Task time estimate</InputLabel>
          <Select
            value={this.state.timeEstimate}
            onChange={this.handleChangeTimeEstimate}
            input={<Input id="task-time" />}
          >
            <MenuItem value={15}>15 minutes</MenuItem>
            <MenuItem value={30}>30 minutes</MenuItem>
            <MenuItem value={45}>45 minutes</MenuItem>
            <MenuItem value={60}>1 hour</MenuItem>
            <MenuItem value={90}>1 hour 30 minutes</MenuItem>
            <MenuItem value={120}>2 hours</MenuItem>
            <MenuItem value={180}>3 hours</MenuItem>
            <MenuItem value={240}>4 hours</MenuItem>
          </Select>
        </FormControl>

          <TextField
            input={<Input id="dueDate" />}
            className={classes.formControl}
            id="dueDate"
            value={this.state.dueDate || 'yyyy/mm/dd'}
            label="Due date"
            type="date"
            onChange={this.handleChange}
          />
        </div>
        <FormControl className={classes.notesField}>
          <TextField
            id="notes"
            label="Task notes"
            multiline
            rows="4"
            rowsMax="12"
            value={this.state.notes}
            onChange={this.handleChange}
            onBlur={this.handleUpdateNotes}
            margin="normal"
            variant="filled"
          />
          {/* <div className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleUpdateNotes}>
              Save notes
            </Button>
          </div> */}
        </FormControl>
        <List>
        <Typography className={classes.dependencies}>Task Dependencies</Typography>
        {
          this.props.tasks.filter(item => (
            this.props.task
              ? item._id !== this.props.task._id
              : item))
            .map(dependency => (
              <ListItem
                key={dependency._id}
                button
                disableRipple
                className={classes.dependencyListItem}
              >
              <ListItemIcon>
                <Checkbox
                  id='task-complete-checkbox'
                  checked={this.state.dependencies.indexOf(dependency._id) > -1}
                  onClick={this.handleSelectDependency}
                  value={dependency._id}
                />
              </ListItemIcon>
              <ListItemText primary={dependency.title} className={classes.title}/>
              <ListItemText className={classes.timeEstimate}>
                <Typography className={classes.timeEstimate}>
                  {dependency.timeEstimate > 90 ? `${dependency.timeEstimate / 60} hr` : `${dependency.timeEstimate} m`}
                </Typography>
              </ListItemText>
              </ListItem>
            ))
        }
        </List>
      </React.Fragment>
    );
  }
}

SideTaskForm.propTypes = {
  preferences: PropTypes.object,
  onComplete: PropTypes.func,
  handleFormOpen: PropTypes.func,
  handleOpen: PropTypes.func,
  taskUpdateRequest: PropTypes.func,
  task: PropTypes.object,
  tasks: PropTypes.array,
  show: PropTypes.bool,
  timeEstimateProp: PropTypes.number,
  classes: PropTypes.object,
};

SideTaskForm.defaultProps = {
  preferences: {},
  onComplete: noop,
  handleFormOpen: noop,
  handleOpen: noop,
  taskUpdateRequest: noop,
  tasks: PropTypes.array,
  show: PropTypes.bool,
  timeEstimateProp: PropTypes.number,
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  preferences: state.preferences,
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  taskUpdateRequest: task => dispatch(taskActions.taskUpdateRequest(task)),
  taskCreateRequest: task => dispatch(taskActions.taskCreateRequest(task)),
});

export default compose(
  withStyles(styles, { name: 'SideTaskForm' }),
  connect(mapStateToProps, mapDispatchToProps),
)(SideTaskForm);
