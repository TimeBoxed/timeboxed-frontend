import React from 'react';
import { noop } from 'lodash';
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
import * as profileActions from '../../actions/profile';
import autobind from '../../utils/auto-bind';
import ROUTES from '../../routes';

class ScrollDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      scroll: 'paper',
    };

    autobind.call(this, ScrollDialog);
  }

  componentDidMount() {
    this.setState({ open: true });
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleAgree = () => {
    this.props.pUpdateUserProfile({ ...this.props.profile, privacySigned: true });
    this.setState({
      open: false,
    });
  };

  handleClose = () => {
    this.props.pUpdateUserProfile({ ...this.props.profile });
    this.setState({ open: false });
  };

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          fullWidth={true}
          maxWidth='sm'
        >
          <DialogTitle id="scroll-dialog-title">Notice of Privacy</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
              nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras
              mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              <Link to={ROUTES.PRIVACY_REJECTED}>Disagree</Link>
            </Button>
            <Button onClick={this.handleAgree} color="primary">
              <Link to={ROUTES.DASHBOARD}>Agree</Link>
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

ScrollDialog.propTypes = {
  profile: PropTypes.object,
  pUpdateUserProfile: PropTypes.func,
};

ScrollDialog.defaultProps = {
  profile: {},
  pUpdateUserProfile: noop,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  pUpdateUserProfile: profile => dispatch(profileActions.profileUpdateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDialog);
