import React, { Component } from 'react';

class AuthRedirect extends Component {
  // TODO: check for login to hide/remove button
  render() {
    return (
      <div>
        <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/oauth/google&scope=profile%20email%20https://www.googleapis.com/auth/calendar&prompt=consent&response_type=code&client_id=764054157229-rk6rpfibtegmg3pp5j4a2uvjpnp8ku5t.apps.googleusercontent.com">
          <button id='sign-in-button'>SIGN IN WITH GOOGLE</button>
        </a>
      </div>
    );
  }
}

export default AuthRedirect;
