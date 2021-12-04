import React from 'react';

// displays promoted.
// sources:
// tables https://www.youtube.com/watch?v=hson9BXU9F8
// iterate thorugh json: https://stackoverflow.com/questions/43241139/looping-through-table-data-react-js
// html tables: https://www.w3schools.com/html/html_tables.asp

// it is suppossed to be listofdic_T_s
function DisplayPromoted({
  listofDICKSp, voteUp, voteDown,
}) {
  const tableDataH = listofDICKSp.map((objp) => (
    <tr>
      <td>
        <img
          src={objp.heroImageLink}
          width={25} // to be determined
          alt="Character"
        />
      </td>
      <td>
        {objp.nameTitle}
      </td>
      <td>
        {objp.voteCount}
      </td>
      <td>
        <button onClick={() => voteUp(objp.isHero, objp.id)} type="button">
          Up
        </button>
      </td>
      <td>
        <button onClick={() => voteDown(objp.isHero, objp.id)} type="button">
          Down
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
            <th>Name/Title</th>
            <th>Vote Count</th>
            <th>Vote up!</th>
            <th>Vote down!</th>
          </tr>
        </thead>
        <tbody>
          {tableDataH}
        </tbody>
      </table>
    </div>
  );
}
DisplayPromoted.defaultProps = {
  voteUp: () => {},
  voteDown: () => {},
  listofDICKSp: [],
};

DisplayPromoted.propTypes = {
  voteUp: Function,
  voteDown: Function,
  listofDICKSp: Array,
};
export default DisplayPromoted;

//    <div>
// <p>
// { props.name }
// <button
// onClick={ addForm }
// >Add Hero/Comic</button>
// </p>
// </div>
