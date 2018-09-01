import React from 'react';
import TBLogo from '../../assets/logo/logo-white.svg';

class Logo extends React.Component {
  render() {
    return (
      <div id = 'header-image'>
        <TBLogo id = 'tb-logo' />    
             {/* <p>TimeBoxed</p> */}
      </div>
    );
  }
}

export default Logo;
