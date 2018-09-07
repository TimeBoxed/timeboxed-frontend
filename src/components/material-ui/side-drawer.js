import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ROUTES from '../../routes';
// import Divider from '@material-ui/core/Divider';

const styles = {
  list: {
    minWidth: 1000,
  },
};

class SideDrawer extends React.Component {
  state = {
    left: false,
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
      onClose: this.handleClose(),
    });
  };

  render() {
    const classes = this.props;
  
    const sideList = (
    <div className = {classes.list} >
    <Link to={ROUTES.DASHBOARD}>
        <MenuItem onClick={this.handleClose}>
          Dashboard
        </MenuItem>
      </Link>
      <Link to={ROUTES.PREFERENCES}>
        <MenuItem onClick={this.handleClose}>
          Preferences
        </MenuItem>
      </Link>
      <Link to={ROUTES.LANDING}>
        <MenuItem onClick={this.handleLogout}>
          Logout
        </MenuItem>
      </Link>
    </div>
    );

    return (
    <div>
      <Button onClick = {this.toggleDrawer('left', true)}>
        <MenuIcon />
      </Button>
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
