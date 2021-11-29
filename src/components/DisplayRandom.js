import React from 'react';

function DisplayRandom({
listofDICKSr, AddFav
}) {
  const isRanHero = listofDICKSr[0].hero;

  return (
    <div>
      {isRanHero ? (
        <div>
          Random Character
        </div>
      ) : (
        <div>
          Random Hero
        </div>
        <div>
        </div>   
      )}
    </div>
  );
}
DisplayRandom.defaultProps = {
  DeleteFavC: () => {},
  listofDICKSr: [],
};
DisplayRandom.propTypes = {
  DeleteFavC: Function,
  listofDICKSr: Array,
};

export default DisplayRandom;
