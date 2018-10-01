import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

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

    return (
      <div>
        <Snackbar
          open={open}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          className={classes[type]}
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

export default connect(mapStateToProps)(DirectionSnackbar);
