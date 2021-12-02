import React from 'react';
// import comic-hulk-angry from '../images/comic-hulk-angry.jpg'
// import hulk-thinking from '../images/hulk-thinking.jpg'

// import MakeDataJson from './makeDataJson';
// This component appears with the results given from an API.
// sources:
// tables https://www.youtube.com/watch?v=hson9BXU9F8
// put images on either side:
//  https://stackoverflow.com/questions/16603884/align-2-images-one-to-right-other-to-left-inside-div
// html tables: https://www.w3schools.com/html/html_tables.asp

function FormResultHeroComparison({
  noResults, nameList2, images2, comicsCommon, storiesCommon, eventsCommon,
}) {
  let leftName = null;
  let leftImage = null;
  let rightName = null;
  let rightImage = null;
  const someIndex0 = 0;
  const someIndex1 = 0;
  if (nameList2.length > 1) {
    if (nameList2[someIndex0] === 'wd') {
      leftName = 'Who is dat?';
      leftImage = '../images/hulk-thinking.jpg';
    } else {
      leftName = nameList2[someIndex0];
      leftImage = images2[someIndex0];
    }
    if (nameList2[someIndex1] === 'wd') {
      rightName = 'Who is dat?';
      rightImage = '../images/hulk-thinking.jpg';
    } else {
      rightName = nameList2[someIndex1];
      rightImage = images2[someIndex1];
    }
  }
  return (
    <div>
      <div id="hero_COS_image_outer">
        <div id="left_hero">
          <img
            src={leftImage}
            width={150} // to be determined
            alt="Hero_1 or confused_hulk"
          />
          {leftName}
        </div>
        <div id="right_hero">
          <img
            src={rightImage}
            width={150} // to be determined
            alt="Hero_2 or confused_hulk"
          />
          {rightName}
        </div>
      </div>
      {noResults ? (
        <div>
          <img
            src="../images/comic-hulk-angry.jpg"
            width={300} // to be determined
            alt="Angry hulk"
          />
          ArGh! Nothin in commn.
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                Common
              </tr>
            </thead>
            <thead>
              <tr>
                Comics
              </tr>
              <tr>
                Stories
              </tr>
              <tr>
                Events
              </tr>
            </thead>
            <tbody>
              <tr>
                {comicsCommon}
              </tr>
              <tr>
                {storiesCommon}
              </tr>
              <tr>
                {eventsCommon}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
FormResultHeroComparison.defaultProps = {
  noResults: true,
  nameList2: [],
  comicsCommon: '',
  images2: [],
  storiesCommon: '',
  eventsCommon: '',
};

FormResultHeroComparison.propTypes = {
  noResults: Boolean,
  nameList2: Array,
  comicsCommon: String,
  images2: Array,
  storiesCommon: String,
  eventsCommon: String,
};
export default FormResultHeroComparison;

//    <div>
// <p>
// { props.name }
// <button
// onClick={ addForm }
// >Add Hero/Comic</button>
// </p>
// </div>
