import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import * as authActions from '../../actions/auth';
import ROUTES from '../../routes';
import Logo from '../../assets/logo/logo-white.svg';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
    maxWidth: '100px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo: {
    maxHeight: '3em',
    maxWidth: '3em',
  },
  logoContainer: {
    width: '100%',
    verticalAlign: 'middle',

  },
  logoText: {
    display: 'inline-block',
    height: '100%',
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: this.props.loggedIn,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
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
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <div className={classes.logoContainer}>
              <Logo className={classes.logo} style={{ display: 'inline-block' }}/>
              <div className={classes.logoText}>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  TimeBoxed
                </Typography>
              </div>
            </div>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <Link to={ROUTES.DASHBOARD}>
                    <MenuItem onClick={this.handleClose}>
                      Dashboard
                    </MenuItem>
                  </Link>
                  <Link to={ROUTES.SETUP}>
                    <MenuItem onClick={this.handleClose}>
                      Settings
                    </MenuItem>
                  </Link>
                  <Link to={ROUTES.LANDING}>
                    <MenuItem onClick={this.handleLogout}>
                      Logout
                    </MenuItem>
                  </Link>
                </Menu>
              </div>
            )}
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
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MenuAppBar));
