import React from 'react';
import {useState} from 'react';

import SearchForm from './SearchForm';
import FormResult from './FormResult';

function Searcher() {
  function searchUpResult(name, isHero) {
    console.log(name);
    console.log(isHero);

    //  DO FETCH AFTER THIS
  }

  //  STATE ARRAY 
  const [resultsToAdd, setResultsToAdd] = useState([]);

  function searchResultAdd(name, id, isAdding) {
    console.log(name);
    console.log(id);
    console.log(isAdding);

    //  IDEA HERE IS TO ADD OR REMOVE NAMES FROM THE RESULTSTOADD STATE ARRAY
  }

  function saveResults() {
    //  WITH A STATE ARRAY, SEND TO FETCH TO ADD TO DATABASE
    
  }

  return (
      <div>
        <SearchForm
          onClick={ searchUpResult }
        />

        <FormResult 
          name="Moon Knight"
          id="00214153"
          onClick={ searchResultAdd }
        />
        <FormResult 
          name="Venom"
          id="00234824"
          onClick={ searchResultAdd }
        />
        <FormResult 
          name="Wraith"
          id="00234235"
          onClick={ searchResultAdd }
        />
        <br/>

        <button onClick={ saveResults }>
          Save Results
        </button>
      </div>
  )
}

export default Searcher;