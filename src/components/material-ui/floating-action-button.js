import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    // display: 'none',

    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      float: 'right',
      margin: theme.spacing.unit,
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class AddFAB extends React.Component {
  handleClick = () => {
    this.props.activate();
  }

  render() {
    const { classes } = this.props;
    return (
      <Button onClick={this.handleClick} variant="fab" color="secondary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Button>
    );
  }
}

AddFAB.propTypes = {
  classes: PropTypes.object.isRequired,
  activate: PropTypes.func,
};

export default withStyles(styles)(AddFAB);
