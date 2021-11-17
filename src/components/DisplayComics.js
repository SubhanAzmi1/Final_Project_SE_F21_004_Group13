import React from 'react';

// import MakeDataJson from './makeDataJson';
// This component appears with the results given from an API.
// It gives the option to either add a given result.
// sources:
// tables https://www.youtube.com/watch?v=hson9BXU9F8
// iterate thorugh json: https://stackoverflow.com/questions/43241139/looping-through-table-data-react-js
// html tables: https://www.w3schools.com/html/html_tables.asp
function DisplayComics({
  listofDICKS, DeleteFav,
}) {
  // function addForm() {
  //   onClick(nameList[0], '1');
  // }
  // depending on isHero is true i have different headers
  //    for the table to be displayed.
  //    then each column in a row is one item from the various arrays.
  const tableData = listofDICKS.map((obj) => (
    <tr>
      <td>
        <img
          src={obj.imageUrl}
          width={60} // to be determined
          alt="Comic"
        />
      </td>
      <td>
        {obj.nameTitle}
      </td>
      <td>
        {obj.date}
      </td>
      <td>
        {obj.info}
      </td>
      <td>
        {obj.id}
      </td>
      <td>
        <button onClick={() => DeleteFav(obj.nameTitle, obj.date, obj.info, obj.id, obj.imageUrl)} type="button">
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
            <th>Title</th>
            <th>Date_published</th>
            <th>Series</th>
            <th>ID</th>
            <th>Delete Favorites!</th>
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </table>
    </div>
  );
}
DisplayComics.defaultProps = {
  DeleteFav: () => {},
  listofDICKS: [],
};

DisplayComics.propTypes = {
  DeleteFav: Function,
  listofDICKS: Array,
};
export default DisplayComics;

//    <div>
// <p>
// { props.name }
// <button
// onClick={ addForm }
// >Add Hero/Comic</button>
// </p>
// </div>
