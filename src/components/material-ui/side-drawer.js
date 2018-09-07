import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';

const styles = {
  list: {
    width: 250,
  },
};

class SideDrawer extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const classes = this.props;
  
    const sideList = (
    <div className = {classes.list}>
      <List>Testing</List>
    </div>
    );

    return (
    <div>
      <Button onClick = {this.toggleDrawer('left', true)}>Open Left</Button>
      <Drawer open = { this.state.left } onClose = { this.toggleDrawer('left', false)} >
        <div 
          tabIndex = {0}
          role = "button"
          onClick = { this.toggleDrawer('left', false)}
          onKeyDown = { this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
      </Drawer>
    </div>
    );
  }
}

SideDrawer.protTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideDrawer);
