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
    width: '100%',
  },
  textField: {
    width: '80%',
    maxHeight: '3.0em',
    lineHeight: '1.8em',
  },
});

class NewTaskForm extends React.Component {
  state = {
    title: '',
    timeEstimate: '',
    dateSelect: false,
    dueDate: '',
    dependencies: [],
  };

  // componentDidMount() {
  //   this.handleUpdateProps();
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.task !== this.props.task) {
  //     this.handleUpdateProps();
  //   }
  // }

  // handleUpdateProps = () => {
  //   this.setState({
  //     open: this.props.show,
  //     title: this.props.task ? this.props.task.title : '',
  //     timeEstimate: this.props.timeEstimate,
  //     dateSelect: this.props.task.dueDate,
  //     dueDate: this.props.task.dueDate,
  //     dependencies: this.props.task.dependencies || [],
  //   });
  // }

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
    this.setState({ title: '' });
  };

  handleSave = (event) => {
    event.preventDefault();
    this.handleClose();
    console.log('submitted');
    return this.props.onComplete({
      ...this.state,
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
        <form onSubmit={this.handleSave} className={classes.formControl}>
          <TextField
            className={classes.textField}
            autoFocus
            margin="dense"
            id="title"
            label="Add new task"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            fullWidth
          />
          {/* <button onClick={this.handleSave}></button> */}
        </form>
      </React.Fragment>
    );
  }
}

NewTaskForm.propTypes = {
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

NewTaskForm.defaultProps = {
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
  withStyles(styles, { name: 'NewTaskForm' }),
  connect(mapStateToProps, mapDispatchToProps),
)(NewTaskForm);
