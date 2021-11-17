/* eslint-disable react/prop-types */
import '../App.css';
import React from 'react';
import Logout from './Logout';

function Home({
  userName,
  hsa,
  id,
  setLoggedIn,
}) {
  return (
    <div>
      <h1>
        {userName}
        &apos;s Song Explorer. User ID:
        {' '}
        {id}
      </h1>
      {hsa ? (
        <>
          <h2> Click here to see lyrics! </h2>
        </>
      ) : (
        <h2>Looks like you don&apos;t have anything saved! Use the form below!</h2>
      )}
      <h1>Your saved artists:</h1>
      <h1>Save a favorite artist ID for later:</h1>
      <Logout setLoggedIn={setLoggedIn} />
    </div>
  );
}
Home.defaultProps = {
  setLoggedIn: () => {},
  hsa: true,
  userName: '',
  id: '',
};

Home.propTypes = {
  setLoggedIn: Function,
  userName: String,
  hsa: Boolean,
  id: String,
};
export default Home;
