/* eslint-disable react/jsx-filename-extension, react/no-array-index-key */

// Sources
//  imagesinTable: https://stackoverflow.com/questions/65161059/how-to-load-images-in-react-table-from-json-file
//  buttonsinTable: https://stackoverflow.com/questions/56775842/i-want-to-create-a-button-inside-a-cell-of-react-table-column

export const COLUMNSHERO = [
  {
    Header: 'Image',
    accessor: 'imageUrl',
    Cell: (tableProps) => (
      <img
              src={tableProps.row.original.imageUrl}
              width={60} // to be determined
              alt='Character image'
            />
          )
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
        Cell: ({ original }) => (
            <button onClick={props.handleClickGroup} type="button">
              Add
            </button>
          )
    },
]
export const COLUMNSCOMIC = [
    {
        Header: 'Image',
        accessor: 'imageUrl',
        Cell: tableProps => (
            <img
              src={tableProps.row.original.imageUrl}
              width={60} // to be determined
              alt='Comic image'
            />
          )
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
        Cell: ({ original }) => (
            <button onClick={props.handleClickGroup} type="button">
              Add
            </button>
          )
    },
]