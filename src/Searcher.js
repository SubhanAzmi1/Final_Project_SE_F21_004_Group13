import React, { useState } from 'react';

import SearchForm from './SearchForm';
import FormResult from './FormResult';

function Searcher() {
  const [nameList, setNameList] = useState([]);
  const [releasedModifiedDates, setreleasedModifiedDates] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [addtionalInfo, setAddtionalInfo] = useState([]);
  const [wereSearchResultsEmpty, setWereSearchResultsEmpty] = useState(false);
  function searchUpResult(searchText, isHero) {
    setNameList([]);
    setreleasedModifiedDates([]);
    setImageUrls([]);
    setAddtionalInfo([]);
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
          if (nameList.length === 0) {
            setWereSearchResultsEmpty(true);
          }
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
          if (nameList.length === 0) {
            setWereSearchResultsEmpty(true);
          }
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
      {wereSearchResultsEmpty ? (
        <div>
          There were no results for your query! Try again.
        </div>
      ) : (
        <div />
      )}
      {nameList.length !== 0 ? (
        <FormResult
          isHero={isHero}
          nameList={nameList}
          dates={releasedModifiedDates}
          images={imageUrls}
          extraInfos={addtionalInfo}
          onClick={searchResultAdd}
          fixResultsEmpty={setWereSearchResultsEmpty}
        />
      ) : (
        <div />
      )}
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
