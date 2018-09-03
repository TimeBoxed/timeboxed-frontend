import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as taskActions from '../../actions/task';

const handleDateSet = () => {
  const result = new Date();
  result.setDate(result.getDate() + 1);
  return result.toISOString().substring(0, 10);
};

const defaultState = {
  open: false,
  title: '',
  timeEstimate: '',
  dateSelect: false,
  dueDate: null,
};

class FormDialog extends React.Component {
  state = {
    open: false,
    title: this.props.task ? this.props.task.title : '',
    timeEstimate: this.props.task && this.props.task.timeEstimate ? this.props.task.timeEstimate : '',
    dateSelect: false,
    dueDate: null,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
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

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.handleClose();
    return this.props.onComplete({ ...this.state, _id: this.props.task._id });
  };

  handleCreateTask = (event) => {
    console.log(this.state, 'state about to make a task');
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(defaultState);
  };

  render() {
    return (
      <div>
        {/* <div onClick={this.handleClickOpen}>
          { this.props.children }
          {console.log(this.props.children, 'in task form')}
        </div> */}
        <Dialog
          open={this.props.show ? this.props.show : this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
          <DialogContent>
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
            <TextField
              autoFocus
              margin="dense"
              id="timeEstimate"
              label="Duration"
              type="text"
              onChange={this.handleChange}
              value={this.state.timeEstimate}
              fullWidth
            />
            <FormControlLabel control={
              <Switch
                onChange={this.handleDateToggle}
                // value={this.state.dateSelect}
                checked={this.state.dateSelect}
              />
            } label='Add Due Date'/>

            { this.state.dateSelect &&
              <TextField
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.task ? this.props.handleOpen : this.props.handleFormOpen} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.task ? this.handleSave : this.handleCreateTask} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  onComplete: PropTypes.func,
  handleFormOpen: PropTypes.func,
  handleOpen: PropTypes.func,
  taskUpdateRequest: PropTypes.func,
  task: PropTypes.object,
  show: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  taskUpdateRequest: task => dispatch(taskActions.taskUpdateRequest(task)),
  taskCreateRequest: task => dispatch(taskActions.taskCreateRequest(task)),
});

export default connect(null, mapDispatchToProps)(FormDialog);
