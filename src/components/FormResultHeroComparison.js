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
  const someIndex1 = 1;
  if (nameList2.length > 1) {
    if (nameList2[someIndex0] === 'wd') {
      leftName = 'Who is dat?';
      leftImage = 'https://www.fightersgeneration.com/nx5/char/hulk-thinking.jpg';
    } else {
      leftName = nameList2[someIndex0];
      leftImage = images2[someIndex0];
    }
    if (nameList2[someIndex1] === 'wd') {
      rightName = 'Who is dat?';
      rightImage = 'https://www.fightersgeneration.com/nx5/char/hulk-thinking.jpg';
    } else {
      rightName = nameList2[someIndex1];
      rightImage = images2[someIndex1];
    }
  }
  window.console.log(noResults);
  return (
    <div id="crossover_super">
      <div id="hero_COS_image_outer">
        <div id="left_hero">
          <div>
            <img
              src={leftImage}
              width={150} // to be determined
              alt="Hero_1 or confused_hulk"
            />
          </div>
          <div>
            {leftName}
          </div>
        </div>
        <div id="right_hero">
          <div>
            <img
              src={rightImage}
              width={150} // to be determined
              alt="Hero_2 or confused_hulk"
            />
          </div>
          <div>
            {rightName}
          </div>
        </div>
      </div>
      <div>
        {noResults ? (
          <div>
            <div id="crossover_table_result">
              <img
                src="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/06/comic-hulk-angry.jpg"
                width={300} // to be determined
                alt="Angry hulk"
              />
            </div>
            <div>
              ArGh! Nothin in commn.
            </div>
          </div>
        ) : (
          <div id="crossover_table_result">
            <table>
              <thead>
                <tr>
                  <th id="common_in_table">
                    Common
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>
                    Comics
                  </th>
                  <th>
                    Stories
                  </th>
                  <th>
                    Events
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {comicsCommon}
                  </td>
                  <td>
                    {storiesCommon}
                  </td>
                  <td>
                    {eventsCommon}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
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
