import React, { div } from 'react';
import { GoogleLogin } from 'react-google-login';

import './App.css';

const clientID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';

function refreshTokenSetup(res) {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  async function refreshToken() {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    setTimeout(refreshToken, refreshTiming);
  }

  setTimeout(refreshToken, refreshTiming);
}

// stuff for login
function Login() {
  function onSuccess(res) {
    console.log('[LoginSuccess] currentUser:', res.profileObj);
    refreshTokenSetup(res);
  }

  function onFailure(res) {
    console.log('[LoginFailure] res:', res);
  }

  return (
    <div>
      <GoogleLogin
        clientID={clientID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn
      />
    </div>
  );
}

export default Login;
