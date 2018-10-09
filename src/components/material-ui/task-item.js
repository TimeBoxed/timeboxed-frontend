import React from 'react';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'block',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  taskItem: {
    maxWidth: '100%',
  },
  mainItem: {
    borderBottom: '1px solid #E4E4E4',
    padding: '2px 16px',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
  mainItemSelectedTask: {
    borderBottom: '1px solid #E4E4E4',
    padding: '2px 16px',
    backgroundColor: '#EDEDED',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
  time: {
    textAlign: 'right',
    minWidth: 50,
    padding: 0,
    paddingRight: 16,
  },
  titleAndDueDate: {
    paddingLeft: 16,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
  title: {
    maxWidth: 600,
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '3.0em',
    lineHeight: '1.8em',
    textOverflow: 'ellipsis',
    textAlign: 'left',
  },
  dueDate: {
    padding: 0,
    color: '#F51616',
  },
});

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.task.completed ? [this.props.task._id] : [0],
      showModal: false,
      selected: this.props.selected,
      dependencies: this.props.task.dependencies ? this.props.task.dependencies : [],
    };
  }

  handleOpen = () => {
    if (!this.props.editingTasks) {
      this.props.onClickShowDetail(this.props.task);
    }
  };

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

    this.setState({ checked: newChecked });

    const completed = currentIndex === -1;
    this.props.onComplete(value, completed);
  };

  handleChange = (event) => {
    event.stopPropagation();
    this.setState(prevState => ({ selected: !prevState.selected }));
    this.props.onSelect(this.props.task._id);
  };

  handleTaskUpdate = (task) => {
    this.setState({ showModal: false });
    return this.props.updateTask(task);
  };

  render() {
    const { task, selectedTask, classes } = this.props;
    const mainItemClass = selectedTask._id === task._id
      ? classes.mainItemSelectedTask
      : classes.mainItem;

    const timeShown = task.timeEstimate === 60
      || task.timeEstimate === 120
      || task.timeEstimate === 180
      || task.timeEstimate === 240
      ? <span> {task.timeEstimate / 60} hr</span>
      : <span> {task.timeEstimate} m</span>;

    const displayDueDate = task.dueDate && task.dueDate.slice(5, 10);

    return (
      <div className={classes.taskItem}>
        <ListItem
          button
          disableRipple
          disableGutters
          className={mainItemClass}
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
              />
          }
          </ListItemIcon>
          <div className={classes.titleAndDueDate}>
            <ListItemText primary={task.title} className={classes.title}/>
            {
              task.dueDate
                && <ListItemText className={classes.dueDate}>
                  <Typography className={classes.dueDate}>Due {displayDueDate}</Typography>
                </ListItemText>
            }
          </div>
          <ListItemText
            inset secondary={timeShown}
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
  onClickShowDetail: PropTypes.func,
  selectedTask: PropTypes.object,
};

TaskItem.defaultProps = {
  task: {},
  classes: {},
  onComplete: noop,
  updateTask: noop,
  editingTasks: false,
  onSelect: noop,
  selected: false,
  selectedTask: {},
};

export default withStyles(styles, { name: 'TaskItem' })(TaskItem);
