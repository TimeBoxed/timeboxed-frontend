import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
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
    return (
      <div>
        <Snackbar
          open={this.props.open}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
        />
      </div>
    );
  }
}

DirectionSnackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
};

DirectionSnackbar.defaultProps = {
  open: false,
  message: '',
};

const mapStateToProps = state => ({
  open: state.ui.snackbar.open,
  message: state.ui.snackbar.message,
});

// Something went wrong. Please try your request again

export default connect(mapStateToProps)(DirectionSnackbar);
