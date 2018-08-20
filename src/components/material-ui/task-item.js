import React from 'react';
import PropTypes from 'prop-types';
// import compose from 'recompose/compose';
// import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'block',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  time: {
    textAlign: 'right',
  },
});

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      checked: [0],
    };
  }


  handleToggle(value) {
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

  render() {
    const { task, classes } = this.props;
    console.log(task);
    return (
      <div className={classes.taskItem}>
        {/* <List key={task._id} component="div" disablePadding> */}
          <ListItem 
            button 
            onClick={() => this.handleToggle(task._id)}
          >
            <ListItemIcon>
            <Checkbox
              checked={this.state.checked.indexOf(task._id) !== -1}
              tabIndex={-1}
              disableRipple
            />
            </ListItemIcon>
            <ListItemText inset primary={task.title} />
    <ListItemText inset secondary={<span> {task.timeEstimate} min</span>} className={classes.time}/>
          </ListItem>
        {/* </List> */}
      </div>
    );
  }
}

TaskItem.propTypes = {
  task: PropTypes.object,
  classes: PropTypes.object,
  onComplete: PropTypes.func,
};

export default withStyles(styles, { name: 'TaskItem' })(TaskItem);