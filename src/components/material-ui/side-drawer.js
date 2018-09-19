import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as authActions from '../../actions/auth';
import ROUTES from '../../routes';

const styles = {
  list: {
    width: 250,
  },
  upperDrawer: {
    height: 150,
    backgroundColor: 'grey',
  },
  drawerItems: {
    paddingLeft: 15,
  },
};

class SideDrawer extends React.Component {
  state = {
    // email: this.props.profile.email,
    auth: this.props.loggedIn,
    left: false,
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.setState({ auth: false, anchorEl: null });
    this.props.logout();
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
      onClose: this.handleClose(),
    });
  };

  render() {
    const { classes } = this.props;
    
    
    const sideList = (
    <div className = {classes.list} >
      <div className = { classes.upperDrawer }></div>
      <Divider />
      <Link to={ROUTES.DASHBOARD}>
        <MenuItem onClick={this.handleClose} className = { classes.drawerItems }>
          Dashboard
        </MenuItem>
      </Link>
      <Link to={ROUTES.PREFERENCES}>
        <MenuItem onClick={this.handleClose} className = { classes.drawerItems }>
          Preferences
        </MenuItem>
      </Link>
      <Link to={ROUTES.LANDING}>
        <MenuItem onClick={this.handleLogout} className = { classes.drawerItems }>
          Logout
        </MenuItem>
      </Link>
    </div>
    );

    return (
      <div className = { classes.root }>
          <Button onClick = {this.toggleDrawer('left', true)}>
            <MenuIcon />
          </Button>
          <Drawer open = { this.state.left } onClose = { this.toggleDrawer('left', false)} >
            <div 
              tabIndex = {0}
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

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideDrawer));
