import React from 'react';
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
});

class FormDialog extends React.Component {
  state = {
    open: false,
    title: this.props.task ? this.props.task.title : '',
    timeEstimate: this.props.timeEstimateProp,
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

  handleChangeTimeEstimate = (e) => {
    const { value } = e.target;
    this.setState({ timeEstimate: value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.handleClose();
    return this.props.onComplete({ ...this.state, _id: this.props.task._id });
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.show ? this.props.show : this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
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
            
            {/* <TextField
              autoFocus
              margin="dense"
              id="timeEstimate"
              label="Duration"
              type="text"
              onChange={this.handleChange}
              value={this.state.timeEstimate}
              fullWidth
            /> */}

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="task-time-simple">Task time</InputLabel>
              <Select
                value={this.state.timeEstimate}
                onChange={this.handleChangeTimeEstimate}
                input={<Input id="task-time-simple" />}
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

            <FormControlLabel control={
              <Switch
                onChange={this.handleDateToggle}
                // value={this.state.dateSelect}
                checked={this.state.dateSelect}
              />
            } label='Add Due Date'/>

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
  preferences: PropTypes.object,
  onComplete: PropTypes.func,
  handleFormOpen: PropTypes.func,
  handleOpen: PropTypes.func,
  taskUpdateRequest: PropTypes.func,
  task: PropTypes.object,
  show: PropTypes.bool,
  timeEstimateProp: PropTypes.number,
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  preferences: state.preferences,
});

const mapDispatchToProps = dispatch => ({
  taskUpdateRequest: task => dispatch(taskActions.taskUpdateRequest(task)),
  taskCreateRequest: task => dispatch(taskActions.taskCreateRequest(task)),
});

export default compose(
  withStyles(styles, { name: 'FormDialog' }),
  connect(mapStateToProps, mapDispatchToProps),
)(FormDialog);
