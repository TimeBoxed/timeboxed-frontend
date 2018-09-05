import React from 'react';
import GoogleLogo from '../../assets/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg';

class Landing extends React.Component {
  render() {
    return (
    <div>
      <a href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${API_URL}/welcome&scope=profile%20email%20https://www.googleapis.com/auth/calendar&prompt=consent&response_type=code&client_id=30945685942-2peaeakg0megqic4lp8d4ffu79p520lm.apps.googleusercontent.com`}>
      <button id='sign-in-button'><GoogleLogo id='googleLogo'/><p>SIGN IN WITH GOOGLE</p></button>
      </a>
    </div>
    );
  }
}
export default Landing;
