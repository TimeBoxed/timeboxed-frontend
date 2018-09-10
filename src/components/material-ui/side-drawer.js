import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as authActions from '../../actions/auth';
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
