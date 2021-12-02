import React from 'react';
// import comic-hulk-angry from '../images/comic-hulk-angry.jpg'
// import hulk-thinking from '../images/hulk-thinking.jpg'

// import MakeDataJson from './makeDataJson';
// This component appears with the results given from an API.
// sources:
// tables https://www.youtube.com/watch?v=hson9BXU9F8
// iterate thorugh json: https://stackoverflow.com/questions/43241139/looping-through-table-data-react-js
// html tables: https://www.w3schools.com/html/html_tables.asp

function FormResultHeroComparison({
  noResults, nameList2, images2, comicsCommon, storiesCommon, eventsCommon,
}) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            Common
          </tr>
        </thead>
      </table>
      {isHero === true ? (
        <table border="1" cellPadding="0.25" id="displayfavtable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Date_modified</th>
              <th>Description</th>
              <th>ID</th>
              <th>Add to Favorites!</th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>
      ) : (
        <table border="1" cellPadding="0.25" id="displayfavtable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Date_published</th>
              <th>Series</th>
              <th>ID</th>
              <th>Add to Favorites!</th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>
      )}
    </div>
  );
}
FormResultHeroComparison.defaultProps = {
  noResults: true,
  nameList2: [],
  comicsCommon: [],
  images2: [],
  storiesCommon: [],
  eventsCommon: [],
};

FormResultHeroComparison.propTypes = {
  noResults: Boolean,
  nameList2: Array,
  comicsCommon: Array,
  images2: Array,
  storiesCommon: Array,
  eventsCommon: Array,
};
export default FormResultHeroComparison;

//    <div>
// <p>
// { props.name }
// <button
// onClick={ addForm }
// >Add Hero/Comic</button>
// </p>
// </div>
