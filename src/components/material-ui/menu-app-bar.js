import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SideDrawer from './side-drawer';
import * as authActions from '../../actions/auth';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  placeholder: {
    height: 28,
    width: 24,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: this.props.loggedIn,
  };

  render() {
    const { classes, loggedIn } = this.props;
    const { auth } = this.state;

    if (!loggedIn) return null;

    return (
      <div className={classes.root}>
        <AppBar position='fixed'>
          <Toolbar>
            {auth ? (
            <SideDrawer />
            ) : <MenuIcon />
            }
            <Typography variant="title" color="inherit" className={classes.flex}>
              {
                this.props.history.location.pathname.replace(/\//, '').toUpperCase()
              }
            </Typography>
            <div className={classes.placeholder}> </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(MenuAppBar))); 
