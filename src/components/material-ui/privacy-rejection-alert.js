import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

export default AlertDialog;
