import React from 'react';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
    timeEstimate: this.props.preferences.timeEstimate,
    dateSelect: false,
    dueDate: '',
    dependencies: [],
  };

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
