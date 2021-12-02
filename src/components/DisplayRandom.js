import React from 'react';

function DisplayRandom({
  isHero, listofDICKSr, AddFav,
}) {
  // const rando1 = listofDICKSr[0];
  // window.console.log(listofDICKSr);
  const displayDataR = listofDICKSr.map((objR) => (
    <>
      <div>
        <img
          src={objR.imageUrl}
          width={150} // to be determined
          alt="Comic/Character"
        />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              {isHero ? (
                <>
                  <th>Name</th>
                  <th>Comics</th>
                </>
              ) : (
                <>
                  <th>Title</th>
                  <th>Characters</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{objR.nameTitle}</td>
              <td>{objR.info2}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              {isHero ? (
                <th>Description</th>
              ) : (
                <th>Series</th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{objR.info}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => AddFav(objR.hero, objR.nameTitle, objR.date, objR.info, objR.id, objR.imageUrl)} type="button">
          Add to Fav.
        </button>
      </div>
    </>
  ));
  return (
    <div>
      {isHero ? (
        <>
          <div>
            Random Character
          </div>
          {displayDataR}
        </>
      ) : (
        <>
          <div>
            Random Comic
          </div>
          {displayDataR}
        </>
      )}
    </div>
  );
}
DisplayRandom.defaultProps = {
  AddFav: () => {},
  listofDICKSr: [],
  isHero: false,
};
DisplayRandom.propTypes = {
  AddFav: Function,
  listofDICKSr: Array,
  isHero: Boolean,
};

export default DisplayRandom;
