import React from 'react';

// import MakeDataJson from './makeDataJson';
// This component appears with the results given from an API.
// It gives the option to either add a given result.
// sources:
// tables https://www.youtube.com/watch?v=hson9BXU9F8
// iterate thorugh json: https://stackoverflow.com/questions/43241139/looping-through-table-data-react-js
// html tables: https://www.w3schools.com/html/html_tables.asp

// it is suppossed to be listofdic_T_s
function DisplayHeros({
  listofDICKSh, DeleteFavH, AddPromoteH
}) {
  // function addForm() {
  //   onClick(nameList[0], '1');
  // }
  // depending on isHero is true i have different headers
  //    for the table to be displayed.
  //    then each column in a row is one item from the various arrays.

  // const dataJsonH = [];
  // // convert array_of_array_of_objects (listofdicksh) to array_of_objects (datajsonh)
  // for (let i = 0; i < listofDICKSh.length; i += 1) {
  //   dataJsonH.push(listofDICKSh[i][0]);
  // }
  // window.console.log(listofDICKSh);
  // window.console.log(dataJsonH);
  const tableDataH = listofDICKSh.map((objH) => (
    <tr>
      <td>
        <img
          src={objH.heroImageLink}
          width={25} // to be determined
          alt="Character"
        />
      </td>
      <td>
        {objH.heroName}
      </td>
      <td>
        {objH.heroDateModified}
      </td>
      <td>
        {objH.heroId}
      </td>
      <td>
        <button onClick={() => DeleteFavH(objH.heroId)} type="button">
          Delete
        </button>
      </td>
       <td>
        <button onClick={() => AddPromoteH(objH.heroId, objH.heroImageLink, objH.heroName)} type="button">
          Add to Promote
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <table cellPadding="0.25" id="displayfavtable">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Date_Modified</th>
            <th>ID</th>
            <th>Delete Favorites!</th>
            <th>Add to Promote!</th>
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
  AddPromoteH: () => {},
  listofDICKSh: [],
};

DisplayHeros.propTypes = {
  DeleteFavH: Function,
  AddPromoteH: Function,
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
