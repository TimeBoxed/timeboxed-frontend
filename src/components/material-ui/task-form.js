import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel'
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import * as taskActions from '../../actions/task';

const handleDateSet = () => {
  const result = new Date();
  result.setDate(result.getDate() + 1);
  return result.toISOString().substring(0, 10);
};

class FormDialog extends React.Component {
  state = {
    open: false,
    title: '',
    timeEstimate: 30,
    dateSelect: false,
    dueDate: '',
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      timeEstimate: this.props.preferences.taskLengthDefault,
      title: this.props.task.title,
    });
  };

  handleDateToggle = () => {
    this.setState(prevState => ({
      dateSelect: !prevState.dateSelect,
      dueDate: prevState.dueDate === '' ? handleDateSet() : '',
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
    return this.props.taskUpdateRequest({...this.state, _id: this.props.task._id });
  };

  render() {
    // TODO: dynamic button text
    // const openButtonText = ...
    return (
      <div>
        <div onClick={this.handleClickOpen}>
          { this.props.children }
        </div>
        <Dialog
          open={this.state.open}
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
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  preferences: PropTypes.object,
};

const mapStateToProps = state => ({
  preferences: state.preferences,
});

const mapDispatchToProps = dispatch => ({
  taskUpdateRequest: task => dispatch(taskActions.taskUpdateRequest(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
