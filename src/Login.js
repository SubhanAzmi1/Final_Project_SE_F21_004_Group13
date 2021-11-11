import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import './App.css';

require('dotenv').config();

const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// console.log('From login');

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
function Login({ setLoggedIn, setName, setHasSavedArtist }) { // FIX ESLINT LATER
  const history = useHistory();
  function onSuccess(res) {
    console.log('[LoginSuccess] currentUser:', res.profileObj);
    refreshTokenSetup(res);
    // get id_token from google and send it to backend.
    //    can maybe skip verifying in backend and send info from frontend.
    const idToken = res.tokenId;
    //  Upon verification receive the data dict,
    //  and pass it back to parent component.
    fetch('/login_google_authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: idToken,
        email: res.profileObj.email,
        fName: res.profileObj.givenName,
        imageUrl: res.profileObj.imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setName(data.username);
        setHasSavedArtist(data.has_artists_saved);
        history.push('/home');
      });
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
