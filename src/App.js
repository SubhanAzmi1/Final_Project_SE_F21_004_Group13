import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';

require('dotenv').config();
// Sources:
//   Passing data between components:
//    https://www.freecodecamp.org/news/pass-data-between-components-in-react/

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  console.log('what is logged in status: ', +loggedIn);
  const getUserDataFromLogin = (idToken) => {
    //  Upon verification receive the data dict,
    //  and pass it back to parent component.
    // console.log('what is logged in status: ', +loggedIn);
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
        setUserData({ userData: data });
        console.log(userData);
      });
    console.log(userData);
  };
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/index">
            { loggedIn === 'true' ? (
              <>
                <Redirect to="/home" />
              </>
            )
              : (
                <>
                  <Login
                    getUserDataFromLogin={(value) => getUserDataFromLogin(value)}
                    setLoggedIn={(value) => setLoggedIn(value)}
                  />
                  <Logout
                    setLoggedIn={(value) => setLoggedIn(value)}
                  />
                </>
              )}
          </Route>
          <Route exact path="/home">
            <Home userData={userData} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// <Route exact path="/home">
// <Home userData={userData} />
// </Route>
