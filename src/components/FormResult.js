import React from 'react';

// import MakeDataJson from './makeDataJson';
// This component appears with the results given from an API.
// It gives the option to either add a given result.
// sources:
// tables https://www.youtube.com/watch?v=hson9BXU9F8
// iterate thorugh json: https://stackoverflow.com/questions/43241139/looping-through-table-data-react-js
// html tables: https://www.w3schools.com/html/html_tables.asp
function FormResult({
  isHero, nameList, dates, images, extraInfos, ids, extraInfos2, AddFav, fixResultsEmpty,
}) {
  function makeDataJs() {
    const dataJson = [];
    // window.console.log(nameList);
    for (let i = 0; i < nameList.length; i += 1) {
      dataJson.push({
        nameTitle: nameList[i],
        date: dates[i],
        imageUrl: images[i],
        info: extraInfos[i],
        info2: extraInfos2[i],
        id: ids[i],
      });
    }
    return dataJson;
  }
  const data = makeDataJs();
  fixResultsEmpty(false);
  // function addForm() {
  //   onClick(nameList[0], '1');
  // }
  // depending on isHero is true i have different headers
  //    for the table to be displayed.
  //    then each column in a row is one item from the various arrays.
  // window.console.log(data);
  const tableData = data.map((obj) => (
    <tr>
      <td>
        <img
          src={obj.imageUrl}
          width={50} // to be determined
          alt="Character"
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
        {obj.info2}
      </td>
      <td>
        <button onClick={() => AddFav(isHero, obj.nameTitle, obj.date, obj.info, obj.id, obj.imageUrl)} type="button">
          Add
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      {isHero === true ? (
        <table cellPadding="0.25" id="displayfavtable1">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Date_modified</th>
              <th>Description</th>
              <th>Comics</th>
              <th>Add to Favorites!</th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>
      ) : (
        <table cellPadding="0.25" id="displayfavtable1">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Date_published</th>
              <th>Series</th>
              <th>Characters</th>
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
FormResult.defaultProps = {
  AddFav: () => {},
  fixResultsEmpty: () => {},
  isHero: true,
  nameList: [],
  dates: [],
  images: [],
  extraInfos: [],
  extraInfos2: [],
  ids: [],
};

FormResult.propTypes = {
  AddFav: Function,
  fixResultsEmpty: Function,
  isHero: Boolean,
  nameList: Array,
  dates: Array,
  images: Array,
  extraInfos: Array,
  extraInfos2: Array,
  ids: Array,
};
export default FormResult;

//    <div>
// <p>
// { props.name }
// <button
// onClick={ addForm }
// >Add Hero/Comic</button>
// </p>
// </div>
