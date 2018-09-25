import React from 'react';
import { noop } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SideDrawer from './side-drawer';
import * as authActions from '../../actions/auth';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  placeholder: {
    height: 28,
    width: 64,
  },
  menuIconHolder: {
    width: 64,
  },
  doneButton: {
    display: 'none',
    width: 64,
    padding: 0,
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
});

class MenuAppBar extends React.Component {
  state = {
    auth: this.props.loggedIn,
  };

  handlePressDone = () => {
    return this.props.onComplete();
  }

  render() {
    const { classes, loggedIn } = this.props;

    if (!loggedIn) return null;

    return (
      <div className={classes.root}>
        <AppBar position='fixed'>
          <Toolbar>
            <div className={classes.menuIconHolder}>
              {this.state.auth ? <SideDrawer/> : <MenuIcon/>}
            </div>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {
                this.props.history.location.pathname.replace(/\//, '').toUpperCase()
              }
            </Typography>
            {
              this.props.editing
                ? <Button
                    className={classes.doneButton}
                    onClick={this.handlePressDone}
                  >
                    Done
                  </Button>
                : <div className={classes.placeholder}> </div>
            }
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
  onComplete: PropTypes.func,
  editing: PropTypes.bool,
};

MenuAppBar.defaultProps = {
  classes: {},
  loggedIn: false,
  logout: noop,
  history: {},
  onComplete: noop,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(MenuAppBar))); // eslint-disable-line max-len
