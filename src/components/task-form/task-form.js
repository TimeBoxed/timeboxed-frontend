import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import Button from '@material-ui/core/Button';

import autoBind from '../../utils/auto-bind';


const defaultState = {
  title: '',
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, TaskForm);
  }

  handleChange(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(defaultState);
  }

  render() {
    const buttonText = this.props.task ? 'Update Task' : 'Create New Task';
    const { classes } = this.props;

    return (
      <div className='task-form-container'>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
      
        <TextField
          id="title"
          label="Create New Task"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreateNewFolder />
              </InputAdornment>
            ),
          }}
        />
        <Button type='submit' size="small" variant="outlined" className={classes.button}>
          {buttonText}
        </Button>      
      </form>
      </div>
    );
  }
}

TaskForm.propTypes = {
  task: PropTypes.object,
  onComplete: PropTypes.func,
  classes: PropTypes.object,
};

export default withStyles(styles)(TaskForm);
