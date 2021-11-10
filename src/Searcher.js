import React from 'react';
import {useState} from 'react';

import SearchForm from './SearchForm';
import FormResult from './FormResult';

function Searcher() {
  function searchUpResult(name, isHero){
    console.log(name);
    console.log(isHero);
  }

  function searchResultAdd(name, id){
    console.log(name);
    console.log(id);
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
      </div>
  )
}

export default Searcher;