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
  const [hasSavedArtist, setHasSavedArtist] = useState(false);
  const [userId, setUserId] = useState(null);
  window.console.log('what is logged in status: ', +loggedIn);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home
              userName={name}
              id={userId}
              hsa={hasSavedArtist}
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route exact path="/login">
            <>
              <Login
                setLoggedIn={setLoggedIn}
                setName={setName}
                setUserId={setUserId}
                setHasSavedArtist={setHasSavedArtist}
              />
              <Logout
                setLoggedIn={setLoggedIn}
              />
            </>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
