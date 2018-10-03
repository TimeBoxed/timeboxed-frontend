import React from 'react';
import Logo from '../material-ui/logo';
import GoogleLogo from '../../assets/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg';
import ROUTES from '../../routes';

import './signup.scss';

const Signup = () => {
  return (
    <div className='signup-page-div'>
      <div className='signup-page-logo-div'>
        <Logo />
        <div className='logo-text'>
          <h2>TimeBoxed</h2>
        </div>
      </div>
      <a href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${API_URL}/welcome&scope=profile%20email%20https://www.googleapis.com/auth/calendar.readonly&prompt=consent&response_type=code&access_type=offline&client_id=30945685942-2peaeakg0megqic4lp8d4ffu79p520lm.apps.googleusercontent.com`}>
        <button id='sign-up-button'><GoogleLogo id='googleLogo'/><p>Sign up with Google</p></button>
      </a>
      <div className='new-account-link'>
        <a href={ROUTES.LANDING}><h4>LOG IN WITH GOOGLE</h4></a>
      </div>
    </div>
  );
};

export default Signup;
