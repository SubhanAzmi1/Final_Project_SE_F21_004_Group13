import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';

require('dotenv').config();
// Sources:
//   Passing data between components:
//    https://www.freecodecamp.org/news/pass-data-between-components-in-react/

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn'));
  // const [userData, setUserData] = useState(null);
  const [name, setName] = useState(sessionStorage.getItem('name'));
  // const [savedArtist, setSavedArtist] = useState([]);
  const [hasSavedArtist, setHasSavedArtist] = useState(false);
  console.log('what is logged in status: ', +loggedIn);
  // const getUserDataFromLogin = (idToken) => {
  //   //  Upon verification receive the data dict,
  //   //  and pass it back to parent component.
  //   // console.log('what is logged in status: ', +loggedIn);
  //   fetch('/login_google_authenticate', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ token: idToken }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       // setUserData({ userData: data });
  //       setName(data.username);
  //       // setSavedArtist(data.artist_ids);
  //       setHasSavedArtist(data.has_artists_saved);
  //       console.log('name is: ', name);
  //       history.push('/home');
  //     });
  //   console.log('name is: ', name);
  // };
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home
              userName={name}
              hsa={hasSavedArtist}
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route exact path="/login">
            <>
              <Login
                setLoggedIn={setLoggedIn}
                setName={setName}
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

// <Route exact path="/home">
// <Home userData={userData} />
// </Route>
