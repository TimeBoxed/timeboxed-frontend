import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import MaterialUITaskForm from './task-form';

const styles = theme => ({
  root: {
    display: 'block',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  mainItem: {
    borderBottom: '1px solid #E4E4E4',
  },
  time: {
    textAlign: 'right',
  },
});

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      checked: this.props.task.completed ? [this.props.task._id] : [0],
      showModal: false,
      selected: this.props.selected,
    };
  }

  handleOpen = () => {
    if (!this.props.editingTasks) {
      this.setState(prevState => ({ showModal: !prevState.showModal }));
    }
  }

  handleToggle = value => (event) => {
    event.stopPropagation();
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });

    const completed = currentIndex === -1;
    this.props.onComplete(value, completed);
  }

  handleChange = (event) => {
    event.stopPropagation();
    this.setState(prevState => ({ selected: !prevState.selected }));
    this.props.onSelect(this.props.task._id);
  };

  handleTaskUpdate = (task) => {
    this.setState({ showModal: false });
    return this.props.updateTask(task);
  }

  render() {
    const { task, classes } = this.props;
    return (
      <div className={classes.taskItem}>
        <MaterialUITaskForm 
          show={this.state.showModal} 
          task={this.props.task} 
          onComplete={this.handleTaskUpdate} 
          handleOpen={this.handleOpen}
          timeEstimateProp={this.props.task.timeEstimate}
        />
        <ListItem 
          button 
          disableRipple
          className={classes.mainItem}
          onClick={this.handleOpen}
        >
          <ListItemIcon>
          {
            this.props.editingTasks 
              ? <Radio
              checked={this.state.selected}
              onClick={this.handleChange}
              value={task._id}
              name="radio-button-selection"
            />
              : <Checkbox
              id='task-complete-checkbox'
              onClick={this.handleToggle(task._id)}
              checked={this.state.checked.indexOf(task._id) !== -1}
              tabIndex={-1}
              />
          }

          </ListItemIcon>
          <ListItemText inset primary={task.title} />
          <ListItemText 
                inset secondary={<span> {task.timeEstimate} min</span>} 
                className={classes.time}
          />
          {this.props.dragHandle && this.props.dragHandle}
          
        </ListItem>
      </div>
    );
  }
}

TaskItem.propTypes = {
  task: PropTypes.object,
  classes: PropTypes.object,
  onComplete: PropTypes.func,
  updateTask: PropTypes.func,
  editingTasks: PropTypes.bool,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  dragHandle: PropTypes.element,
};

export default withStyles(styles, { name: 'TaskItem' })(TaskItem);
