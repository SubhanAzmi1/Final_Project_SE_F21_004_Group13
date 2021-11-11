import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

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
function Login({ setLoggedIn, setName, setHasSavedArtist }) { // FIX ESLINT LATER
  const history = useHistory();
  function onSuccess(res) {
    console.log('[LoginSuccess] currentUser:', res.profileObj);
    refreshTokenSetup(res);
    // get id_token from google and send it to backend.
    const idToken = res.tokenId;
    // console.log(idToken);
    //  Upon verification receive the data dict,
    //  and pass it back to parent component.
    // getUserDataFromLogin(idToken);
    fetch('/login_google_authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: idToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setUserData({ userData: data });
        setName(data.username);
        // setSavedArtist(data.artist_ids);
        setHasSavedArtist(data.has_artists_saved);
        // console.log('name is: ', name);
        history.push('/home');
      });
    // console.log('what is logged in status: ', +loggedIn);
    // sessionStorage.setItem('loggedIn', true);
    // setLoggedIn(sessionStorage.getItem('loggedIn'));
    const logintrue = true;
    setLoggedIn(logintrue);
    // history.push('/home');
    // console.log('what is logged in status: ', +loggedIn);
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
