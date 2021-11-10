import React, { div } from 'react';
import { GoogleLogout } from 'react-google-login';

require('dotenv').config();

const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log('From logOUT');

//  for logging out
// eslint-disable-next-line react/prop-types
function Logout({ setLoggedIn }) { // FIX ESLINT LATER
  function onSuccess() {
    console.log('Successfully logged out!');
    const loginfalse = false;
    setLoggedIn(loginfalse);
  }

  return (
    <div>
      <GoogleLogout
        clientId={clientID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
