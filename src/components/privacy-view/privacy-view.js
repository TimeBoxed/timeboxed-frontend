import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import * as profileActions from '../../actions/profile';
import PrivacyDialog from '../material-ui/privacy-dialog';
import PrivacyRejectionAlert from '../material-ui/privacy-rejection-alert';
import autobind from '../../utils/auto-bind';

class PrivacyView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      privacyRejection: false,
    };
    
    autobind.call(this, PrivacyView);
  }
  
  componentDidUpdate() {

  }

  handleDialogClose() {
    this.setState = {
      privacyRejection: true,
    };
  }

  render() {
    const JSXPrivacyNotice = <PrivacyDialog onClose={this.handleDialogClose}/>;

    const JSXPrivacyRejection = <PrivacyRejectionAlert/>;

    return (
      <div className='privacy-view-page'>
        {this.state.privacyRejection ? JSXPrivacyRejection : JSXPrivacyNotice}
      </div>
    );
  }
}

export default PrivacyView;
