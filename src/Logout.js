import React, { div } from 'react';
import { GoogleLogout } from 'react-google-login';

const clientID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';

//  for logging out
function Logout() {
  function onSuccess() {
    console.log('Successfully logged out!');
  }

  return (
    <div>
      <GoogleLogout
        clientID={clientID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
