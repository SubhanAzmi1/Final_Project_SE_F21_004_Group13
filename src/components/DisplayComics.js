import React from 'react';

// import MakeDataJson from './makeDataJson';
// This component appears with the results given from an API.
// It gives the option to either add a given result.
// sources:
// tables https://www.youtube.com/watch?v=hson9BXU9F8
// iterate thorugh json: https://stackoverflow.com/questions/43241139/looping-through-table-data-react-js
// html tables: https://www.w3schools.com/html/html_tables.asp

// it is suppossed to be listofdic_T_s
function DisplayComics({
  listofDICKSc, DeleteFavC, AddPromoteC,
}) {
  // function addForm() {
  //   onClick(nameList[0], '1');
  // }
  // depending on isHero is true i have different headers
  //    for the table to be displayed.
  //    then each column in a row is one item from the various arrays.

  // const dataJsonC = [];
  // // convert array_of_array_of_objects (listofdicksh) to array_of_objects (datajsonh)
  // for (let i = 0; i < listofDICKSc.length; i += 1) {
  //   dataJsonC.push(listofDICKSc[i][0]);
  // }
  // window.console.log(listofDICKSc);
  // window.console.log(dataJsonC);
  const tableDataC = listofDICKSc.map((objC) => (
    <tr>
      <td>
        <img
          src={objC.comicImageLink}
          width={25} // to be determined
          alt="Comic"
        />
      </td>
      <td>
        {objC.comicName}
      </td>
      <td>
        {objC.comicDatePublished}
      </td>
      <td>
        {objC.comicId}
      </td>
      <td>
        <button onClick={() => DeleteFavC(objC.comicId)} type="button">
          Delete
        </button>
      </td>
      <td>
        <button onClick={() => AddPromoteC(objC.comicId, objC.comicName, objC.comicImageLink)} type="button">
          Promote
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            let s = 'http://www.google.com/search?tbm=shop&q=';
            s += objC.comicName;
            s = s.replace('#', '%23');
            window.open(s);
          }}
          type="button"
        >
          Buy
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
            <th>Title</th>
            <th>Date_published</th>
            <th>ID</th>
            <th>Delete Favorites!</th>
            <th>Promote!</th>
            <th>Buy!</th>
          </tr>
        </thead>
        <tbody>
          {tableDataC}
        </tbody>
      </table>
    </div>
  );
}
DisplayComics.defaultProps = {
  DeleteFavC: () => {},
  AddPromoteC: () => {},
  listofDICKSc: [],
};

DisplayComics.propTypes = {
  DeleteFavC: Function,
  AddPromoteC: Function,
  listofDICKSc: Array,
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
