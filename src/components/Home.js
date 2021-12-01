/* eslint-disable react/prop-types */

// sources:
// app styling: https://www.quackit.com/html/html_editors/scratchpad/?example=/css/flexbox/tutorial/create_a_website_layout_with_flexbox_example_1
import '../App.css';
import React from 'react';
import Logout from './Logout';
import Searcher from './Searcher';

function Home({
  userName,
  userIdH,
  setLoggedIn,
}) {
  return (
    <div>
      <header>
        <h1>
          {userName}
          &apos;s Marvel Explorer. User ID:
          {' '}
          {userIdH}
        </h1>
      </header>
      <body>
        <Searcher userIdS={userIdH} />
      </body>
      <footer>
        <Logout setLoggedIn={setLoggedIn} />
      </footer>
    </div>
  );
}
Home.defaultProps = {
  setLoggedIn: () => {},
  userName: '',
  userIdH: '',
};

Home.propTypes = {
  setLoggedIn: Function,
  userName: String,
  userIdH: String,
};
export default Home;
