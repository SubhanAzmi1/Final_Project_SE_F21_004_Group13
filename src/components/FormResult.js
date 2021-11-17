import React, { useMemo } from 'react';
import { useTable } from 'react-table';

import MakeDataJson from './makeDataJson';
// This component appears with the results given from an API.
// It gives the option to either add a given result.
// sources:
// tables https://www.youtube.com/watch?v=hson9BXU9F8
function FormResult({
  isHero, nameList, dates, images, extraInfos, ids, AddFav, fixResultsEmpty,
}) {
  fixResultsEmpty(false);
  function addForm() {
    onClick(nameList[0], '1');
  }
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
        <button onClick={() => AddFav(isHero,)} type="button">
          Add
        </button>
      ),
    },
  ];
  const COLUMNSCOMIC = [
    {
      Header: 'Image',
      accessor: 'imageUrl',
      Cell: (tableProps) => (
        <img
          src={tableProps.row.original.imageUrl}
          width={60} // to be determined
          alt="Comic"
        />
      ),
    },
    {
      Header: 'Title',
      accessor: 'nameTitle',
    },
    {
      Header: 'Date_Published',
      accessor: 'date',
    },
    {
      Header: 'Series',
      accessor: 'info',
    },
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Add to Favorites',
      Cell: () => (
        <button onClick={() => AddFav()} type="button">
          Add
        </button>
      ),
    },
  ];
  const columnsHero = useMemo(() => COLUMNSHERO, []);
  const columnsComic = useMemo(() => COLUMNSCOMIC, []);
  const data = useMemo(() => MakeDataJson(nameList, dates, images, extraInfos, ids), []);
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
