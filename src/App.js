import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';

require('dotenv').config();
// Sources:
//   Passing data between components:
//    https://www.freecodecamp.org/news/pass-data-between-components-in-react/
//  UseHistory routing:
//    https://www.youtube.com/watch?v=tiAlSpyWIDs

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn'));
  const [name, setName] = useState(sessionStorage.getItem('name'));
  const [userId, setUserId] = useState(null);
  window.console.log('what is logged in status: ', +loggedIn);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home
              userName={name}
              userIdH={userId}
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route exact path="/login">
            <body>
              <div id="landing_super">
                <div>
                  <h2>
                    Welcome to Ghost Racoon&apos;s Marvel Discovery tool!
                  </h2>
                </div>
                <div>
                  <img
                    src="https://www.thathashtagshow.com/wp-content/uploads/2020/11/240-2407691_marvel-comics-logo-png-jpg-royalty-free-marvel-1024x843.png"
                    width={300} // to be determined
                    alt="Comic/Character"
                  />
                </div>
                <div>
                  <Login
                    setLoggedIn={setLoggedIn}
                    setName={setName}
                    setUserId={setUserId}
                  />
                </div>
                <div>
                  <Logout
                    setLoggedIn={setLoggedIn}
                  />
                </div>
                <div id="landing_mid_1">
                  <h3>Functionality: </h3>
                  <h4>
                    Allows users to explore and discover comics and characters
                    {' '}
                    via search of the marvel api.
                  </h4>
                  <h3>Why it matters: </h3>
                  <h4>
                    Marvel comics is an extremely popular brand with many
                    {' '}
                    (in the tens of thousands) characters.
                    {' '}
                    This tool allows users to explore and find more information about those
                    {' '}
                    characters and the comics they appear in.
                  </h4>
                  <h3>Group 13 Members: </h3>
                  <h4>Christopher Pulido, David Prefontaine, Praveen Doluweera, Subhan Azmi</h4>
                </div>
              </div>
            </body>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
