import React from 'react';
import { noop } from 'lodash';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as profileActions from '../../actions/profile';
import * as preferencesActions from '../../actions/preferences';
import { logout, deleteAccountRequest } from '../../actions/auth';
import { triggerSnackbar } from '../../actions/ui';
import ROUTES from '../../routes';

import './preferences.scss';
import CircularIndeterminate from '../material-ui/load-spinner';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  mainContainer: {
    marginTop: 70,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  button: {
    margin: theme.spacing.unit,
  },
  blueButton: {
    width: 100,
    backgroundColor: '#0B5999',
    color: '#FFF',
  },
});

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: false,
      opentaskLengthDefault: false,
      openbreatherTime: false,
      openselectedCalendar: false,
      openagendaReceiveTime: false,
      openprofileReset: false,
      openaccountDelete: false,
      taskLengthDefault: '',
      agendaReceiveTime: '',
      breatherTime: '',
      selectedCalendar: '',
      loading: true,
    };
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      return this.props.pFetchUserProfile()
        .then(() => {
          this.props.pFetchUserPreferences()
            .then((preferences) => {
              const { payload } = preferences;
              const {
                breatherTime,
                agendaReceiveTime,
                taskLengthDefault,
                selectedCalendar,
              } = payload;
              this.setState({
                breatherTime,
                agendaReceiveTime,
                taskLengthDefault,
                selectedCalendar,
                loading: false,
              });
            });
        });
    }
    return null;
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleCalendarSelection = name => (event) => {
    const targetCalendar = this.props.profile.calendars.filter((calendar) => {
      return calendar.name === event.target.value;
    });
    this.setState({ [name]: targetCalendar[0] });
  };

  handleClickOpen = (value) => {
    const toOpen = `open${value}`;
    this.setState({ [toOpen]: true });
  };

  handleClose = (value) => {
    const toOpen = `open${value}`;
    this.setState({ [toOpen]: false });
  };

  handleSubmit = () => {
    this.props.pUpdateUserPreferences(this.state)
      .then(() => {
        this.props.triggerSnackbar('success', 'Preferences updated');
        return this.setState({ fireRedirect: true });
      })
      .catch(() => {
        this.props.triggerSnackbar('error');
      });
  };

  handleProfileReset = () => {
    this.handleClose('profileReset');
    this.props.profileReset()
      .then(() => {
        this.props.triggerSnackbar('success', 'Account reset');
        this.setState({ fireRedirect: true });
      })
      .catch(() => {
        this.props.triggerSnackbar('error');
      });
  };

  handleAccountDelete = () => {
    this.handleClose('accountDelete');
    this.props.accountDelete();
    this.props.logout();
    this.props.triggerSnackbar('success', 'Account deleted');
  };

  renderCalendarSelection = () => {
    const { classes, profile } = this.props;
    return (
      <ListItem style={{ borderBottom: '1px solid gray' }}>
        <ListItemText primary={'Calendar'}/>
        <Button style={{ border: '1px solid gray' }} onClick={() => this.handleClickOpen('selectedCalendar')}>
          {this.state.selectedCalendar && this.state.selectedCalendar.name}
        </Button>
        <Dialog
          open={this.state.openselectedCalendar}
          onClose={() => this.handleClose('selectedCalendar')}
        >
          <DialogTitle>Update calendar to use</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="selected-calendar-simple">Select Calendar</InputLabel>
                <Select
                  value={this.state.selectedCalendar.name}
                  onChange={this.handleCalendarSelection('selectedCalendar')}
                  input={<Input id="selected-calendar-simple" />}
                >
                  {
                    profile.calendars.map(calendar => (
                      <MenuItem
                        value={calendar.name}
                        key={calendar.id}>
                        {calendar.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose('selectedCalendar')} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleClose('selectedCalendar')} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  };

  renderAgendaTimeSelection = () => {
    const { classes } = this.props;
    return (
      <ListItem style={{ borderBottom: '1px solid gray' }}>
        <ListItemText primary={'Daily agenda time'}/>
        <Button style={{ border: '1px solid gray' }} onClick={() => this.handleClickOpen('agendaReceiveTime')}>
          {this.state.agendaReceiveTime && this.state.agendaReceiveTime[0] === '0' ? this.state.agendaReceiveTime.slice(1) : this.state.agendaReceiveTime} AM</Button>
        <Dialog
          open={this.state.openagendaReceiveTime}
          onClose={() => this.handleClose('agendaReceiveTime')}
        >
          <DialogTitle>Update time to receive agenda</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="agenda-receive-time-simple">Time</InputLabel>
                <Select
                  value={this.state.agendaReceiveTime}
                  onChange={this.handleChange('agendaReceiveTime')}
                  input={<Input id="agenda-receive-time-simple" />}
                >
                  <MenuItem value={'05:00'}>5:00 AM</MenuItem>
                  <MenuItem value={'05:30'}>5:30 AM</MenuItem>
                  <MenuItem value={'06:00'}>6:00 AM</MenuItem>
                  <MenuItem value={'06:30'}>6:30 AM</MenuItem>
                  <MenuItem value={'07:00'}>7:00 AM</MenuItem>
                  <MenuItem value={'07:30'}>7:30 AM</MenuItem>
                  <MenuItem value={'08:00'}>8:00 AM</MenuItem>
                  <MenuItem value={'08:30'}>8:30 AM</MenuItem>
                  <MenuItem value={'09:00'}>9:00 AM</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose('agendaReceiveTime')} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleClose('agendaReceiveTime')} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  };

  renderTaskLengthSelection = () => {
    const { classes } = this.props;
    const taskLengthInHours = this.state.taskLengthDefault / 60;

    return (
      <ListItem style={{ borderBottom: '1px solid gray' }}>
        <ListItemText primary={'Default task time'}/>
        <Button style={{ border: '1px solid gray' }} onClick={() => this.handleClickOpen('taskLengthDefault')}>
          {this.state.taskLengthDefault > 45 ? taskLengthInHours : this.state.taskLengthDefault}
          {this.state.taskLengthDefault > 45 ? 'hr' : ' minutes'}
          {this.state.taskLengthDefault > 60 && 's'}
        </Button>
        <Dialog
          open={this.state.opentaskLengthDefault}
          onClose={() => this.handleClose('taskLengthDefault')}
        >
          <DialogTitle>Update default task time</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="task-time-simple">Task time</InputLabel>
                <Select
                  value={this.state.taskLengthDefault}
                  onChange={this.handleChange('taskLengthDefault')}
                  input={<Input id="task-time-simple" />}
                >
                  <MenuItem value={15}>15 minutes</MenuItem>
                  <MenuItem value={30}>30 minutes</MenuItem>
                  <MenuItem value={45}>45 minutes</MenuItem>
                  <MenuItem value={60}>1 hour</MenuItem>
                  <MenuItem value={120}>2 hours</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose('taskLengthDefault')} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleClose('taskLengthDefault')} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  };

  renderBreatherTimeSelection = () => {
    const { classes } = this.props;
    return (
      <ListItem style={{ borderBottom: '1px solid gray' }}>
        <ListItemText primary={'Breather time'}/>
        <Button style={{ border: '1px solid gray' }} onClick={() => this.handleClickOpen('breatherTime')}>
          {this.state.breatherTime}
          {this.state.breatherTime > 45 ? 'hr' : ' minutes'}
        </Button>
        <Dialog
          open={this.state.openbreatherTime}
          onClose={() => this.handleClose('breatherTime')}
        >
          <DialogTitle>Update breather time</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="breather-time-simple">Breather time</InputLabel>
                <Select
                  value={this.state.breatherTime}
                  onChange={this.handleChange('breatherTime')}
                  input={<Input id="breather-time-simple" />}
                >
                  <MenuItem value={0}>0 minutes</MenuItem>
                  <MenuItem value={5}>5 minutes</MenuItem>
                  <MenuItem value={10}>10 minutes</MenuItem>
                  <MenuItem value={15}>15 minutes</MenuItem>
                  <MenuItem value={20}>20 minutes</MenuItem>
                  <MenuItem value={30}>30 minutes</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose('breatherTime')} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleClose('breatherTime')} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  };

  renderProfileReset = () => {
    const { classes } = this.props;
    return (
      <ListItem>
        <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleClickOpen('profileReset')}>
          Reset Profile
        </Button>
        <Dialog
          open={this.state.openprofileReset}
          onClose={() => this.handleClose('profileReset')}
        >
          <DialogTitle>ARE YOU SURE?</DialogTitle>
          <ListItemText>
            Confirming will delete all saved tasks and reset all saved preferences. This action
            cannot be undone. Would you like to proceed?
          </ListItemText>
          <DialogActions>
            <Button onClick={this.handleProfileReset} className={classes.button} style={{ border: '1px solid gray' }}>
              Yes, reset my profile
            </Button>
            <Button onClick={() => this.handleClose('profileReset')} variant="contained" color="secondary" className={classes.button}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  };

  renderAccountDelete = () => {
    const { classes } = this.props;
    return (
      <ListItem>
        <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleClickOpen('accountDelete')}>
          Delete Account
        </Button>
        <Dialog
          open={this.state.openaccountDelete}
          onClose={() => this.handleClose('accountDelete')}
        >
          <DialogTitle>ARE YOU SURE?</DialogTitle>
          <ListItemText>
            Confirming will delete your account with Timeboxed. All tasks and saved preferences will
            be lost. This action cannot be undone. Would you like to proceed?
          </ListItemText>
          <DialogActions>
            <Button onClick={this.handleAccountDelete} className={classes.button} style={{ border: '1px solid gray' }}>
              Yes, delete my account permanently
            </Button>
            <Button onClick={() => this.handleClose('accountDelete')} variant="contained" color="secondary" className={classes.button}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    );
  };

  render() {
    const { profile, classes } = this.props;

    if (this.state.loading) {
      return <CircularIndeterminate/>;
    }

    return (
      <div className={classes.mainContainer}>
        <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleSubmit}>
          Save Settings
        </Button>
        <div className='preferences-main'>
          {
            profile
            && <List component="div">
                {this.renderCalendarSelection()}
                {this.renderAgendaTimeSelection()}
                {this.renderTaskLengthSelection()}
                {this.renderBreatherTimeSelection()}
              </List>
          }
          {this.renderProfileReset()}
          {this.renderAccountDelete()}
        </div>
        <div>
          { this.state.fireRedirect && <Redirect to={ROUTES.DASHBOARD}/> }
        </div>
      </div>
    );
  }
}

Preferences.propTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool,
  pFetchUserProfile: PropTypes.func,
  preferences: PropTypes.object,
  pFetchUserPreferences: PropTypes.func,
  pUpdateUserPreferences: PropTypes.func,
  classes: PropTypes.object,
  history: PropTypes.object,
  profileReset: PropTypes.func,
  accountDelete: PropTypes.func,
  logout: PropTypes.func,
  triggerSnackbar: PropTypes.func,
};

Preferences.defaultProps = {
  loggedIn: false,
  pFetchUserProfile: noop,
  preferences: {},
  pFetchUserPreferences: noop,
  pUpdateUserPreferences: noop,
  classes: {},
  history: {},
  profileReset: noop,
  accountDelete: noop,
  logout: noop,
  triggerSnackbar: noop,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
  preferences: state.preferences,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  pFetchUserPreferences: () => dispatch(preferencesActions.preferencesFetchRequest()),
  pUpdateUserPreferences: prefs => dispatch(preferencesActions.preferencesUpdateRequest(prefs)),
  profileReset: () => dispatch(profileActions.profileResetRequest()),
  accountDelete: () => dispatch(deleteAccountRequest()),
  logout: () => dispatch(logout()),
  triggerSnackbar: (type, message) => dispatch(triggerSnackbar(type, message)),
});

export default compose(
  withStyles(styles, { name: 'Preferences' }),
  connect(mapStateToProps, mapDispatchToProps),
)(Preferences);
