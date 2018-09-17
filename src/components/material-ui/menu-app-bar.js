import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SideDrawer from './side-drawer';
import Logo from './logo';
import * as authActions from '../../actions/auth';
import ROUTES from '../../routes';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  placeholder: {
    height: 64,
    width: 64,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: this.props.loggedIn,
    anchorEl: null,
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.setState({ auth: false, anchorEl: null });
    this.props.logout();
  };

  render() {
    const { classes } = this.props;
    const { auth } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position = { window.location.pathname !== ROUTES.LANDING ? 'fixed' : 'static' }>
          <Toolbar>
            {auth ? (
            <SideDrawer />
            ) : <MenuIcon />
            }
            <Typography variant="title" color="inherit" className={classes.flex}>
              {
                window.location.pathname !== ROUTES.LANDING ? window.location.pathname.replace(/\//, '').toUpperCase() : <Logo />
              }
            </Typography>
            <div className={classes.placeholder}></div>
          </Toolbar>          
        </AppBar>        
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool,
  logout: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MenuAppBar));
