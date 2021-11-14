import React, { useState } from 'react';

import SearchForm from './SearchForm';
import FormResult from './FormResult';

function Searcher() {
  const [nameList, setNameList] = useState([]);
  const [releasedModifiedDates, setreleasedModifiedDates] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [addtionalInfo, setAddtionalInfo] = useState([]);
  function searchUpResult(searchText, isHero) {
    if (isHero === true) {
      fetch('/marvelLookupHero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: searchText }),
      })
        .then((response) => response.json())
        .then((searchResult) => {
        // console.log(dataPostSave);
          setNameList(searchResult.names);
          setreleasedModifiedDates(searchResult.modified_dates);
          setImageUrls(searchResult.image_urls);
          setAddtionalInfo(searchResult.descriptions);
        });
    } else { // comic
      fetch('/marvelLookupComic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: searchText }),
      })
        .then((response) => response.json())
        .then((searchResult) => {
        // console.log(dataPostSave);
          setNameList(searchResult.titles);
          setreleasedModifiedDates(searchResult.release_dates);
          setImageUrls(searchResult.image_urls);
          setAddtionalInfo(searchResult.series);
        });
    }
    console.log(searchText);
    console.log(isHero);
  }

  function searchResultAdd(name, id) {
    console.log(name);
    console.log(id);
  }

  return (
    <div>
      <SearchForm
        onClick={searchUpResult}
      />
      <FormResult
        isHero={isHero}
        nameList={nameList}
        dates={releasedModifiedDates}
        images={imageUrls}
        extraInfos={addtionalInfo}
        onClick={searchResultAdd}
      />
      <FormResult
        name="Venom"
        id="00234824"
        onClick={searchResultAdd}
      />
      <FormResult
        name="Wraith"
        id="00234235"
        onClick={searchResultAdd}
      />
    </div>
  );
}

export default Searcher;
