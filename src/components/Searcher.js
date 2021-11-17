/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';

// import SearchForm from './SearchForm';

import FormResult from './FormResult';
import DisplayComics from './DisplayComics';
import DisplayHeros from './DisplayHeros';

function Searcher({ id }) {
  const [nameList, setNameList] = useState([]);
  const [releasedModifiedDates, setreleasedModifiedDates] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [addtionalInfo, setAddtionalInfo] = useState([]);
  const [ids, setIds] = useState([]);
  const [wereSearchResultsEmpty, setWereSearchResultsEmpty] = useState(false);
  const [heroRadioActive, setHeroActive] = useState(true);
  const [comicRadioActive, setComicActive] = useState(false);
  const textInput = useRef(null);
  const [herosFE, setHerosFE] = useState([]);
  const [comicsFE, setComicsFE] = useState([]);
  const [getcounter, setGetCounter] = useState(0);
  function getUserComics() {
    fetch('/get_User_Comics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => response.json())
      .then((DATA) => {
        setHerosFE(DATA);
      });
  }
  function getUserHeroes() {
    fetch('/get_User_Heroes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => response.json())
      .then((DATA) => {
        setComicsFE(DATA);
      });
  }
  if (getcounter === 0) {
    getUserComics();
    getUserHeroes();
    setGetCounter(1);
  }
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
          if (nameList.length === 0) {
            setWereSearchResultsEmpty(true);
          }
          textInput.current.value = '';
        });
    }
  }
  function searchResultAdd(ishero, name, date, info, id2, imageLink) {
    //  appending JSON
    if (ishero === true) {
      window.console.log('we got in here bitch!');
      window.console.log(id2);
      const heroIDsToFE = [];
      heroIDsToFE.push(
        {
          heroId: id2,
          heroName: name,
          heroDateModified: date,
          heroImageLink: imageLink,
          heroDescription: info,
        },
      );
      const updatedHeroes = [...herosFE, setHerosFE];
      setComicsFE(updatedHeroes);
    } else {
      window.console.log('we got in here bitch! 222');
      window.console.log(id2);
      const comicsIDsFE = [];
      comicsIDsFE.push(
        {
          comicId: id2,
          comicName: name,
          comicDatePublished: date,
          comicImageLink: imageLink,
          comicSeries: info,
        },
      );
      window.console.log(comicsFE);
      const updatedComics = [...comicsFE, comicsIDsFE];
      window.console.log(updatedComics);
      setComicsFE(updatedComics);
      window.console.log(comicsFE);
    }
  }
  function deleteFavComic(name, date, info, id2, imageLink) {
    //  appending JSON

    const comicsIDsFE = [];
    comicsIDsFE.push(
      {
        comicId: id2,
        comicName: name,
        comicDatePublished: date,
        comicImageLink: imageLink,
        comicSeries: info,
      },
    );
    const updatedComics = [...comicsFE.slice(0, comicsIDsFE), ...comicsFE.slice(comicsIDsFE + 1)];
    setComicsFE(updatedComics);
  }
  function deleteFavHero(name, date, info, id2, imageLink) {
    //  appending JSON

    const heroIDsToFE = [];
    heroIDsToFE.push(
      {
        heroId: id2,
        heroName: name,
        heroDateModified: date,
        heroImageLink: imageLink,
        heroDescription: info,
      },
    );
    const updatedHeroes = [...herosFE.slice(0, heroIDsToFE), ...herosFE.slice(heroIDsToFE + 1)];
    setComicsFE(updatedHeroes);
  }

  function saveResults() {
    fetch('/marvelMakeChangesToDatabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FEHeroes: herosFE,
        FEComics: comicsFE,
        id,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        console.log('IDs have been added!');
      });
    setGetCounter(0);
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
            data-testid="text_input"
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
      <div>
        <DisplayComics listofDICKS={comicsFE} DeleteFav={deleteFavComic} />
        <DisplayHeros listofDICKS={herosFE} DeleteFav={deleteFavHero} />
        <button onClick={saveResults} type="button">Save Changes</button>
      </div>
    </div>
  );
}
Searcher.defaultProps = {
  id: '',
};

Searcher.propTypes = {
  id: String,
};
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
