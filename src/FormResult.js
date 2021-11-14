import React from 'react';
import {useState} from 'react';

// This component appears with the results given from an API.
// It gives the option to either add a given result.

function FormResult(props) {
  const result_id = props.id;

  function addForm() {
    // eslint-disable-next-line react/prop-types
    props.onClick(props.name, props.id);// FIX ESLINT LATER
  }

  return (
    <div>
      <p>
        { props.name }
      <button
        onClick={ addForm }
      >Add Hero/Comic</button>
      </p>
    </div>
  );
}

export default FormResult;
