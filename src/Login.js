import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';

const clientID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';

// stuff for login
function Login(){
  const onSuccess = (res) => {
    console.log('[LoginSuccess] currentUser:', res.profileObj);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('[LoginFailure] res:', res);
  };

  return (
    <div>
        <GoogleLogin
          clientID = {clientID} 
          buttonText = "Login" 
          onSuccess = {onSuccess} 
          onFailure = {onFailure} 
          cookiePolicy = {'single_host_origin'} 
          isSignedIn = {true} 
        />
    </div>
  );
}

export default Login;