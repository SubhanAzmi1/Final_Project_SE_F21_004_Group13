import React from 'react';

// import MakeDataJson from './makeDataJson';
// This component appears with the results given from an API.
// It gives the option to either add a given result.
// sources:
// tables https://www.youtube.com/watch?v=hson9BXU9F8
// iterate thorugh json: https://stackoverflow.com/questions/43241139/looping-through-table-data-react-js
// html tables: https://www.w3schools.com/html/html_tables.asp
function DisplayHeros({
  listofDICKSh, DeleteFavH,
}) {
  // function addForm() {
  //   onClick(nameList[0], '1');
  // }
  // depending on isHero is true i have different headers
  //    for the table to be displayed.
  //    then each column in a row is one item from the various arrays.
  window.console.log(listofDICKSh);
  const tableDataH = listofDICKSh.map((objH) => (
    <tr>
      <td>
        <img
          src={objH.heroImageLink}
          width={60} // to be determined
          alt="Character"
        />
      </td>
      <td>
        {objH.heroName}
        {window.console.log(objH.heroName)}
      </td>
      <td>
        {objH.heroDateModified}
      </td>
      <td>
        {objH.heroDescription}
      </td>
      <td>
        {objH.heroId}
      </td>
      <td>
        <button onClick={() => DeleteFavH(objH.heroName, objH.heroDateModified, objH.heroDescription, objH.heroId, objH.heroImageLink)} type="button">
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Date_Modified</th>
            <th>Description</th>
            <th>ID</th>
            <th>Delete Favorites!</th>
          </tr>
        </thead>
        <tbody>
          {tableDataH}
        </tbody>
      </table>
    </div>
  );
}
DisplayHeros.defaultProps = {
  DeleteFavH: () => {},
  listofDICKSh: [],
};

DisplayHeros.propTypes = {
  DeleteFavH: Function,
  listofDICKSh: Array,
};
export default DisplayHeros;

//    <div>
// <p>
// { props.name }
// <button
// onClick={ addForm }
// >Add Hero/Comic</button>
// </p>
// </div>
