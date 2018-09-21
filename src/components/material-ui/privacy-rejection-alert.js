import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// ===============================
// ===== MATERIAL UI IMPORTS =====
// ===============================
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// ===============================
// ====== INTERNAL IMPORTS =======
// ===============================
import * as authActions from '../../actions/auth';
import * as profileActions from '../../actions/profile';
import ROUTES from '../../routes';

class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.props.pDeleteUserProfile({ ...this.props.profile });
    this.props.logout();
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          disableBackdropClick={true}
          disableEscapeKeyDown={true}

        >
          <DialogTitle id='alert-dialog-title'>{'Privacy Policy agreement required'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Cannot use TimeBoxed without agreement to Privacy Policy.
              {/* TODO: verify verbage for this dialog */ }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              <Link to={ROUTES.LANDING}>X</Link>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialog.propTypes = {
  profile: PropTypes.object,
  pDeleteUserProfile: PropTypes.func,
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  pDeleteUserProfile: profile => dispatch(profileActions.profileDeleteRequest(profile)),
  logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
