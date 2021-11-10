import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';

import Searcher from './Searcher';

function App() {
  // fetches JSON data passed in by flask.render_template and loaded
  // in public/index.html in the script with id "data"
  // const args = JSON.parse(document.getElementById("data").text);

  return (
    <Searcher />
  );

  // TODO: Implement your main page as a React component.
}

export default App;
