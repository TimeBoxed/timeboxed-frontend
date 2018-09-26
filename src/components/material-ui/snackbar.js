import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const styles = {
  error: {
    backgroundColor: 'red',
  },
  success: {
    backgroundColor: 'green',
  },
};

const TransitionUp = (props) => {
  return <Slide {...props} direction="up" />;
};

class DirectionSnackbar extends React.Component {
  state = {
    open: this.props.open,
    Transition: TransitionUp,
  };

  render() {
    const {
      classes,
      type,
      message,
      open,
    } = this.props;

    const messageJSX = (
      <div className={classes[type]}>
        { type === 'error' ? <ErrorIcon/> : <CheckCircleIcon/> }
        <span id="message-id">{message}</span>
      </div>
    );

    return (
      <div>
        <Snackbar
          open={open}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={messageJSX}
        />
      </div>
    );
  }
}

DirectionSnackbar.propTypes = {
  type: PropTypes.string,
  open: PropTypes.bool,
  message: PropTypes.string,
  classes: PropTypes.object,
};

DirectionSnackbar.defaultProps = {
  open: false,
  message: '',
  classes: {},
};

const mapStateToProps = state => ({
  open: state.ui.snackbar.open,
  message: state.ui.snackbar.message,
  type: state.ui.snackbar.sbType,
});

export default connect(mapStateToProps)(withStyles(styles)(DirectionSnackbar));
