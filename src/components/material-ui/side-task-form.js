import React from 'react';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as taskActions from '../../actions/task';

const handleDateSet = () => {
  const result = new Date();
  result.setDate(result.getDate() + 1);
  return result.toISOString().substring(0, 10);
};

const styles = () => ({
  formControl: {
    width: '50%',
  },
  timeAndDate: {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
  },
});

class SideTaskForm extends React.Component {
  state = {
    open: this.props.show,
    title: this.props.task ? this.props.task.title : '',
    timeEstimate: this.props.task.timeEstimate || this.props.preferences.taskLengthDefault,
    dateSelect: this.props.task.dueDate,
    dueDate: this.props.task.dueDate,
    dependencies: this.props.task.dependencies || [],
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
      dateSelect: this.props.task.dueDate,
      dueDate: this.props.task.dueDate,
      dependencies: this.props.task.dependencies || [],
    });
  }

  handleDateToggle = () => {
    this.setState(prevState => ({
      dateSelect: !prevState.dateSelect,
      dueDate: !prevState.dueDate ? handleDateSet() : '',
    }));
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleChangeTimeEstimate = (e) => {
    const { value } = e.target;
    this.setState({ timeEstimate: value });
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
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Summary"
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
          fullWidth
        />
        <div className={classes.timeAndDate}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="task-time">Task time</InputLabel>
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
          className={classes.formControl}
          autoFocus
          margin="dense"
          id="dueDate"
          value={this.state.dueDate}
          label="Due Date"
          type="date"
          onChange={this.handleChange}
          fullWidth
        />
        </div>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="dependencies">Task to complete first</InputLabel>
          <Select
            multiple
            value={this.state.dependencies}
            onChange={this.handleUpdateDependencies}
            input={<Input id="dependencies" />}
          >
          {
            this.props.tasks.filter(item => (
              this.props.task
                ? item._id !== this.props.task._id
                : item))
              .map(dependency => (
                <MenuItem key={dependency._id} value={dependency.title}>
                  {dependency.title}
                </MenuItem>
              ))
          }
          </Select>
        </FormControl>

        <FormControlLabel control={
          <Switch
            onChange={this.handleDateToggle}
            checked={this.state.dateSelect}
          />
        } label={this.state.dateSelect ? 'Remove Due Date' : 'Add Due Date'}/>

        { this.state.dateSelect
          && <TextField
              autoFocus
              margin="dense"
              id="dueDate"
              value={this.state.dueDate}
              label="Due Date"
              type="date"
              onChange={this.handleChange}
              fullWidth
            />
        }
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
