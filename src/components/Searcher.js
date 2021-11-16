/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';

// import SearchForm from './SearchForm';

import FormResult from './FormResult';

function Searcher() {
  const [nameList, setNameList] = useState([]);
  const [releasedModifiedDates, setreleasedModifiedDates] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [addtionalInfo, setAddtionalInfo] = useState([]);
  const [ids, setIds] = useState([]);
  const [wereSearchResultsEmpty, setWereSearchResultsEmpty] = useState(false);
  const [heroRadioActive, setHeroActive] = useState(true);
  const [comicRadioActive, setComicActive] = useState(false);
  const textInput = useRef(null);
  function setHeroRadio() {
    setHeroActive(true);
    setComicActive(false);
  }

  function setComicRadio() {
    setHeroActive(false);
    setComicActive(true);
  }
  function searchUpResult() {
    setNameList([]);
    setreleasedModifiedDates([]);
    setImageUrls([]);
    setAddtionalInfo([]);
    const textToSearch = textInput.current.value;
    // window.console.log(heroRadioActive);
    // window.console.log(textToSearch);
    if (heroRadioActive === true) {
      fetch('/marvelLookupHero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToSearch }),
      })
        .then((response) => response.json())
        .then((searchResult) => {
        // console.log(dataPostSave);
          setNameList(searchResult.names);
          setreleasedModifiedDates(searchResult.modified_dates);
          setImageUrls(searchResult.image_urls);
          setAddtionalInfo(searchResult.descriptions);
          setIds(searchResult.ids);
          if (nameList.length === 0) {
            setWereSearchResultsEmpty(true);
          }
          // window.console.log(releasedModifiedDates);
          // window.console.log(imageUrls);
          // window.console.log(addtionalInfo);
          // window.console.log(ids);
          textInput.current.value = '';
        });
    } else { // comic
      fetch('/marvelLookupComic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToSearch }),
      })
        .then((response) => response.json())
        .then((searchResult) => {
        // console.log(dataPostSave);
          setNameList(searchResult.titles);
          setreleasedModifiedDates(searchResult.release_dates);
          setImageUrls(searchResult.image_urls);
          setAddtionalInfo(searchResult.series);
          setIds(searchResult.ids);
          // window.console.log(nameList);
          // window.console.log(releasedModifiedDates);
          // window.console.log(imageUrls);
          // window.console.log(addtionalInfo);
          // window.console.log(ids);
          if (nameList.length === 0) {
            setWereSearchResultsEmpty(true);
          }
          textInput.current.value = '';
        });
    }
    // console.log(textToSearch);
    // console.log(heroRadioActive);
  }

  function searchResultAdd(ishero, id) {
    window.console.log(ishero);
    window.console.log(id);
  }

  return (
    <div>
      <div>
        <h2>
          Enter a hero or comic issue here!
        </h2>
        <form>
          <label htmlFor="hero">
            <input
              type="radio"
              value="Hero"
              name="Selection"
              id="hero"
              onChange={setHeroRadio}
              checked={heroRadioActive}
            />
            Hero
          </label>
          <br />
          <label htmlFor="comic">
            <input
              type="radio"
              value="Comic"
              name="Selection"
              id="comic"
              onChange={setComicRadio}
              checked={comicRadioActive}
            />
            Comic
          </label>
          <br />
        </form>
        <form>
          <input
            type="text"
            placeholder="Hero or Comic Name Here"
            ref={textInput}
            maxLength="45"
          />
        </form>
        <button onClick={searchUpResult} type="button">Starts-with search</button>
      </div>
      {wereSearchResultsEmpty ? (
        <div>
          There were no results for your query! Try again.
        </div>
      ) : (
        <div />
      )}
      {ids.length !== 0 ? (
        <div>
          <FormResult
            isHero={heroRadioActive}
            nameList={nameList}
            dates={releasedModifiedDates}
            images={imageUrls}
            extraInfos={addtionalInfo}
            ids={ids}
            AddFav={searchResultAdd}
            fixResultsEmpty={setWereSearchResultsEmpty}
          />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Searcher;

/* <FormResult
          isHero={isHero1}
          nameList={nameList}
          dates={releasedModifiedDates}
          images={imageUrls}
          extraInfos={addtionalInfo}
          ids={ids}
          onClick={searchResultAdd}
          fixResultsEmpty={setWereSearchResultsEmpty}
        /> */
/* <FormResult
        name="Venom"
        id="00234824"
        onClick={searchResultAdd}
      />
      <FormResult
        name="Wraith"
        id="00234235"
        onClick={searchResultAdd}
      /> */
