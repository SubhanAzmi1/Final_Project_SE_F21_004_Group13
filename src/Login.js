import React from 'react';
import { GoogleLogin } from 'react-google-login';

import './App.css';

require('dotenv').config();

const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log('From login');

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
// eslint-disable-next-line react/prop-types
function Login({ getUserDataFromLogin, setLoggedIn }) { // FIX ESLINT LATER
  function onSuccess(res) {
    console.log('[LoginSuccess] currentUser:', res.profileObj);
    refreshTokenSetup(res);
    // get id_token from google and send it to backend.
    const idToken = res.tokenId;
    // console.log(idToken);
    //  Upon verification receive the data dict,
    //  and pass it back to parent component.
    getUserDataFromLogin(idToken);
    const logintrue = true;
    setLoggedIn(logintrue);
  }

  function onFailure(res) {
    console.log('[LoginFailure] res:', res);
  }

  return (
    <div>
      <GoogleLogin
        clientId={clientID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        // eslint-disable-next-line react/jsx-boolean-value
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
