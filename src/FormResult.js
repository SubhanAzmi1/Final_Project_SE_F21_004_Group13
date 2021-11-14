import React, {} from 'react';

// This component appears with the results given from an API.
// It gives the option to either add a given result.

function FormResult({
  isHero, nameList, dates, images, extraInfos, onClick, fixResultsEmpty,
}) {
  fixResultsEmpty(false);
  function addForm() {
    onClick(nameList[0], '1');
  }
  // depending on isHero is true i have different headers
  //    for the table to be displayed.
  //    then each column in a row is one item from the various arrays.
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
FormResult.defaultProps = {
  onClick: () => {},
  fixResultsEmpty: () => {},
  isHero: true,
  nameList: [],
  dates: [],
  images: [],
  extraInfos: [],
};

FormResult.propTypes = {
  onClick: Function,
  fixResultsEmpty: Function,
  isHero: Boolean,
  nameList: Array,
  dates: Array,
  images: Array,
  extraInfos: Array,
};
export default FormResult;
