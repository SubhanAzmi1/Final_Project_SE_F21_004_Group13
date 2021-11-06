import { GoogleLogout } from 'react-google-login';

const clientID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';

//for logging out
function Logout(){
  const onSuccess = () => {
    console.log("Successfully logged out!");
  };

  return (
    <div>
      <GoogleLogout
        clientID = {clientID} 
        buttonText = "Logout" 
        onLogoutSuccess = {onSuccess} 
      ></GoogleLogout>
    </div>
  );
}

export default Logout;