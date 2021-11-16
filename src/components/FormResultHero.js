/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTable } from 'react-table';

// import MakeDataJson from './makeDataJson';
// This component appears with the results given from an API.
// It gives the option to either add a given result.
// sources:
// tables https://www.youtube.com/watch?v=hson9BXU9F8
function FormResultHero({
  isHero, nameList, dates, images, extraInfos, ids, AddFav, fixResultsEmpty,
}) {
  fixResultsEmpty(false);
  // function addForm() {
  //   onClick(nameList[0], '1');
  // }
  // depending on isHero is true i have different headers
  //    for the table to be displayed.
  //    then each column in a row is one item from the various arrays.
  const COLUMNSHERO = [
    {
      Header: 'Image',
      accessor: 'imageUrl',
      Cell: (tableProps) => (
        <img
          src={tableProps.row.original.imageUrl}
          width={60} // to be determined
          alt="Character"
        />
      ),
    },
    {
      Header: 'Name',
      accessor: 'nameTitle',
    },
    {
      Header: 'Date_Modified',
      accessor: 'date',
    },
    {
      Header: 'Description',
      accessor: 'info',
    },
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Add to Favorites',
      Cell: () => (
        <button onClick={() => AddFav(isHero)} type="button">
          Add
        </button>
      ),
    },
  ];

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
  // const columnsHero = useMemo(() => COLUMNSHERO, []);
  // const data = useMemo(() => makeDataJs(), []);
  const data = makeDataJs();

  const tableInstance = useTable({
    COLUMNSHERO,
    data,
  });
  window.console.log(data);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
FormResultHero.defaultProps = {
  AddFav: () => {},
  fixResultsEmpty: () => {},
  isHero: true,
  nameList: [],
  dates: [],
  images: [],
  extraInfos: [],
  ids: [],
};

FormResultHero.propTypes = {
  AddFav: Function,
  fixResultsEmpty: Function,
  isHero: Boolean,
  nameList: Array,
  dates: Array,
  images: Array,
  extraInfos: Array,
  ids: Array,
};
export default FormResultHero;

//    <div>
// <p>
// { props.name }
// <button
// onClick={ addForm }
// >Add Hero/Comic</button>
// </p>
// </div>
