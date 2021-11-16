import React from 'react';

// import MakeDataJson from './makeDataJson';
// This component appears with the results given from an API.
// It gives the option to either add a given result.
// sources:
// tables https://www.youtube.com/watch?v=hson9BXU9F8
// iterate thorugh json: https://stackoverflow.com/questions/43241139/looping-through-table-data-react-js
function FormResult({
  isHero, nameList, dates, images, extraInfos, ids, AddFav, fixResultsEmpty,
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
  const tableData = data.map((obj) => (
    <tr>
      <td>
        <img
          src={obj.imageUrl}
          width={60} // to be determined
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
        {obj.id}
      </td>
      <td>
        <button onClick={() => AddFav(isHero, obj.id)} type="button">
          Add
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      {isHero === true ? (
        <table>
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
        <table>
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
FormResult.defaultProps = {
  AddFav: () => {},
  fixResultsEmpty: () => {},
  isHero: true,
  nameList: [],
  dates: [],
  images: [],
  extraInfos: [],
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
