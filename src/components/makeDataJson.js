/* eslint-disable react/jsx-filename-extension, react/no-array-index-key */

// Source:
//  https://www.tutorialspoint.com/converting-two-arrays-into-a-json-object-in-javascript
function MakeDataJson({
  nameList, dates, images, extraInfos, ids,
}) {
  const dataJson = [];
  window.console.log(nameList);
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
MakeDataJson.defaultProps = {
  isHero: true,
  nameList: [],
  dates: [],
  images: [],
  extraInfos: [],
  ids: [],
};

MakeDataJson.propTypes = {
  nameList: Array,
  dates: Array,
  images: Array,
  extraInfos: Array,
  ids: Array,
};
export default MakeDataJson;
