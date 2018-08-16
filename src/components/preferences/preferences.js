import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
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
// import autobind from '../../utils/auto-bind';

import './preferences.scss';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
});

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opentaskLengthDefault: false,
      openbreatherTime: false,
      taskLengthDefault: '',
      agendaReceiveTime: '',
      breatherTime: '',
    };
    // autobind.call(this, Preferences);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      return this.props.pFetchUserProfile()
        .then(() => {
          this.props.pFetchUserPreferences()
            .then((preferences) => {
              const { payload } = preferences;
              const { breatherTime, agendaReceiveTime, taskLengthDefault } = payload;
              this.setState({ breatherTime, agendaReceiveTime, taskLengthDefault });
            });
        });
    }
    return undefined;
  }

  handleChange = name => (event) => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleClickOpen = (value) => {
    const toOpen = `open${value}`;
    this.setState({ [toOpen]: true });
  };

  handleClose = (value) => {
    const toOpen = `open${value}`;
    this.setState({ [toOpen]: false });
  };


  render() {
    const { profile, classes } = this.props;
    const taskLengthInHours = this.state.taskLengthDefault / 60;

    return (
      <div className='preferences-container'>
      <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleSubmit}>Save Settings</Button>
      <div className='preferences-main'>
        { profile 
        && <List
          component="div"
        >
        {/* Tast Length Default */}
          <ListItem style={{ borderBottom: '1px solid gray' }}>
            <ListItemText primary={'Default task time'}/>
            <Button style={{ border: '1px solid gray' }} onClick={() => this.handleClickOpen('taskLengthDefault')}>
              {this.state.taskLengthDefault > 45 ? taskLengthInHours : this.state.taskLengthDefault} {this.state.taskLengthDefault > 45 ? 'hr' : ' minutes'}{this.state.taskLengthDefault > 60 && 's'}</Button>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.opentaskLengthDefault}
              onClose={() => this.handleClose('taskLengthDefault')}
            >
              <DialogTitle>Update task time</DialogTitle>
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

           {/* Breather Time */}
          <ListItem style={{ borderBottom: '1px solid gray' }}>
            <ListItemText primary={'Breather time'}/>
            <Button style={{ border: '1px solid gray' }} onClick={() => this.handleClickOpen('breatherTime')}>
              {this.state.breatherTime} {this.state.breatherTime > 45 ? 'hr' : ' minutes'}</Button>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.openbreatherTime}
              onClose={() => this.handleClose('breatherTime')}
            >
              <DialogTitle>Update breather time</DialogTitle>
              <DialogContent>
                <form className={classes.container}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="breather-time-simple">Breather time</InputLabel>
                    <Select
                      value={this.state.taskLengthDefault}
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
        </List>
        }
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
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token,
  preferences: state.preferences,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  pFetchUserPreferences: () => dispatch(preferencesActions.preferencesFetchRequest()),
});

export default compose(
  withStyles(styles, { name: 'Preferences' }),
  connect(mapStateToProps, mapDispatchToProps),
)(Preferences);
