import React from 'react';
import Logo from '../material-ui/logo';
import GoogleLogo from '../../assets/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg';
import ROUTES from '../../routes';

import './landing.scss';

const Landing = () => {
  return (
    <div className='landing-page-div'>
      <div className='landing-page-logo-div'>
        <Logo />
        <div className='logo-text'>
          <h2>TimeBoxed</h2>
        </div>
      </div>
      <a href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${API_URL}/oauth/signin&scope=openid%20profile%20email&client_id=30945685942-2peaeakg0megqic4lp8d4ffu79p520lm.apps.googleusercontent.com&prompt=consent&response_type=code`}>
      <button id='sign-in-button'><GoogleLogo id='googleLogo'/><p>Log in with Google</p></button>
      </a>
      <div className='new-account-link'>
        <a href={ROUTES.SIGNUP}><h4>CREATE NEW ACCOUNT</h4></a>
      </div>
    </div>
  );
};

export default Landing;
