/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';

// import SearchForm from './SearchForm';

// sources:
//  add object to usestate: https://newbedev.com/how-do-i-insert-into-an-array-inside-a-object-using-usestate-code-example
//  add object to array: https://www.freecodecamp.org/news/a-complete-guide-to-creating-objects-in-javascript-b0e2450655e8/
//  delete object from array via filter: https://www.delftstack.com/howto/javascript/javascript-remove-object-from-array/
import FormResult from './FormResult';
import FormResultHeroComparison from './FormResultHeroComparison';
import DisplayComics from './DisplayComics';
import DisplayHeros from './DisplayHeros';
import DisplayRandom from './DisplayRandom';
import DisplayPromoted from './DisplayPromoted';

function Searcher({ userIdS }) {
  const [nameList, setNameList] = useState([]);
  const [releasedModifiedDates, setreleasedModifiedDates] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [addtionalInfo, setAddtionalInfo] = useState([]);
  const [addtionalInfo2, setAddtionalInfo2] = useState([]);
  const [ids, setIds] = useState([]);
  const [wereSearchResultsEmpty, setWereSearchResultsEmpty] = useState(false);
  const [heroRadioActive, setHeroActive] = useState(true);
  const [comicRadioActive, setComicActive] = useState(false);

  const [namesCO, setNamesCO] = useState([]);
  const [imageUrlsCO, setImageUrlsCO] = useState([]);
  const [comicsCommonCO, setComicsCommonCO] = useState('');
  const [storiesCommonCO, setStoriesCommonCO] = useState('');
  const [eventsCommonCO, setEventsCommonCO] = useState('');
  const [wereSearchResultsEmpty2, setWereSearchResultsEmpty2] = useState(false);
  const [cOsearchdone, setCOsearchdone] = useState(0);

  const textInput = useRef(null);
  const textInput1 = useRef(null);
  const textInput2 = useRef(null);

  const [herosFE, setHerosFE] = useState([]);
  const [comicsFE, setComicsFE] = useState([]);
  const [randThing, setRandThing] = useState([]);
  const [promotedFE, setPromotedFE] = useState([]);
  const [getcounter, setGetCounter] = useState(0);
  const [isRandHero, setisRandHero] = useState(false);

  function getUserComics() {
    fetch('/get_User_Comics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userIdS,
      }),
    })
      .then((response) => response.json())
      .then((DATA) => {
        // window.console.log(DATA);
        setComicsFE(DATA);
      });
  }
  function getUserHeroes() {
    fetch('/get_User_Heroes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userIdS,
      }),
    })
      .then((response) => response.json())
      .then((DATA) => {
        // window.console.log(DATA);
        setHerosFE(DATA);
      });
  }
  function getPromoted() {
    fetch('/get_Promoted', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      }),
    })
      .then((response) => response.json())
      .then((DATA) => {
        // window.console.log(DATA);
        setPromotedFE(DATA);
      });
  }
  function getRandomHorC() {
    fetch('/get_Random_Hero_or_Comic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userIdS,
      }),
    })
      .then((response) => response.json())
      .then((DATA) => {
        setisRandHero(DATA[0].hero);
        setRandThing(DATA);
      });
  }
  if (getcounter === 0) {
    getUserComics();
    getUserHeroes();
    getRandomHorC();
    getPromoted();
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
    setAddtionalInfo2([]);
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
          setAddtionalInfo2(searchResult.comics);
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
          setAddtionalInfo2(searchResult.characters);
          setIds(searchResult.ids);
          if (nameList.length === 0) {
            setWereSearchResultsEmpty(true);
          }
          textInput.current.value = '';
        });
    }
  }
  function searchUpCrossOverResult() {
    setCOsearchdone(0);
    setWereSearchResultsEmpty2(false);
    const textToSearch1 = textInput1.current.value;
    const textToSearch2 = textInput2.current.value;

    fetch('/marvelLookupCrossovers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        heroOne: textToSearch1,
        heroTwo: textToSearch2,
      }),
    })
      .then((response) => response.json())
      .then((crossSearchResult) => {
      // SEND OVER TO DISPLAY CROSSOVERS
        setNamesCO(crossSearchResult.names);
        setImageUrlsCO(crossSearchResult.image_urls);
        setComicsCommonCO(crossSearchResult.comics_common);
        setStoriesCommonCO(crossSearchResult.stories_common);
        setEventsCommonCO(crossSearchResult.events_common);
        setWereSearchResultsEmpty2(crossSearchResult.nothing_in_common);
        setCOsearchdone(1);
      });
  }
  function searchResultAdd(ishero, name, date, info, id2, imageLink) {
    //  appending JSON
    if (ishero === true) {
      // window.console.log('we got in here bitch!');
      // check to see if it is already in list then just skip
      for (let i = 0; i < herosFE.length; i += 1) {
        if (herosFE[i].heroId === id2) {
          return;
        }
      }
      setHerosFE(() => ([...herosFE, {
        heroId: id2,
        heroName: name,
        heroDateModified: date,
        heroImageLink: imageLink,
        heroDescription: info,
      }]));
    } else {
      // window.console.log('we got in here bitch! 222');
      // // window.console.log(comicsFE);
      // check to see if it is already in list then just skip
      for (let i = 0; i < comicsFE.length; i += 1) {
        if (comicsFE[i].comicId === id2) {
          return;
        }
      }
      setComicsFE(() => ([...comicsFE, {
        comicId: id2,
        comicName: name,
        comicDatePublished: date,
        comicImageLink: imageLink,
        comicSeries: info,
      }]));
      // window.console.log(comicsFE);
    }
  }
  function deleteFavComic(id2c) {
    // removing value from JSON

    // window.console.log(comicsFE);
    let newComics = comicsFE.slice();
    newComics = newComics.filter((value) => value.comicId !== id2c);
    // window.console.log(newComics);
    setComicsFE(newComics);
  }

  function deleteFavHero(id2h) {
    //  removing value from JSON

    // window.console.log(herosFE);
    let newHeros = herosFE.slice();
    newHeros = newHeros.filter((value) => value.heroId !== id2h);
    // window.console.log(newHeros);
    setHerosFE(newHeros);
  }
  function promoteHero(heroId, heroName, heroImgLink) {
    fetch('/addHeroToVote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        heroId,
        heroName,
        heroImgLink,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        window.console.log('Promoted have been updated!');
        // DO SOMETHING TO UPDATE PROMOTED
        getPromoted();
      });
  }
  function promoteComic(comicID, comicName, comicImgLink) {
    fetch('/addComicToVote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comicID,
        comicName,
        comicImgLink,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        window.console.log('Promoted have been updated!');
        // DO SOMETHING TO UPDATE PROMOTED
        getPromoted();
      });
  }
  function VoteUp(isHeroV, idV) {
    fetch('/voteUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isHeroV,
        idV,
      }),
    })
      .then((response) => response.json())
      .then(() => {
      // DO SOMETHING TO UPDATE PROMOTED
        getPromoted();
      });
  }

  function VoteDown(isHeroV, idV) {
    fetch('/voteDown', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isHeroV,
        idV,
      }),
    })
      .then((response) => response.json())
      .then(() => {
      // DO SOMETHING TO UPDATE PROMOTED
        getPromoted();
      });
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
        userIdS,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        window.console.log('IDs have been updated!');
        setGetCounter(0);
      });
  }
  return (
    <div id="main">
      <colrandom>
        {getcounter === 1 ? (
          <div>
            <DisplayRandom
              isHero={isRandHero}
              listofDICKSr={randThing}
              AddFav={searchResultAdd}
            />
          </div>
        ) : (
          <div />
        )}
      </colrandom>
      <colmid>
        <div>
          <h2>
            Enter a character or comic name here!
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
              Character
            </label>
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
              placeholder="Character or Comic Name Here"
              ref={textInput}
              data-testid="text_input"
              maxLength="45"
            />
          </form>
          <button onClick={searchUpResult} type="button" data-testid="sw_search_button">Starts-with search</button>
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
              extraInfos2={addtionalInfo2}
              ids={ids}
              AddFav={searchResultAdd}
              fixResultsEmpty={setWereSearchResultsEmpty}
            />
          </div>
        ) : (
          <div />
        )}
        <div>
          <h2>
            Enter a Character crossover here!
          </h2>
          <form>
            <input
              type="text"
              placeholder="Character One's Name Here"
              ref={textInput1}
              maxLength="45"
              id="hero1"
            />
            <input
              type="text"
              placeholder="Character Two's Name Here"
              ref={textInput2}
              maxLength="45"
              id="hero2"
            />
          </form>
          <button onClick={searchUpCrossOverResult} type="button">Starts-with search</button>
        </div>
        {cOsearchdone !== 0 ? (
          <div>
            <FormResultHeroComparison
              noResults={wereSearchResultsEmpty2}
              nameList2={namesCO}
              images2={imageUrlsCO}
              comicsCommon={comicsCommonCO}
              storiesCommon={storiesCommonCO}
              eventsCommon={eventsCommonCO}
            />
          </div>
        ) : (
          <div />
        )}
      </colmid>
      <colsaved>
        <div>
          Favorite Comics
          <DisplayComics
            listofDICKSc={comicsFE}
            DeleteFavC={deleteFavComic}
            AddPromoteC={promoteComic}
          />
        </div>
        <div>
          Favorite Characters
          <DisplayHeros
            listofDICKSh={herosFE}
            DeleteFavH={deleteFavHero}
            AddPromoteH={promoteHero}
          />
        </div>
        <div>
          <button onClick={saveResults} type="button">Save Changes</button>
        </div>
        <div>
          Promoted Characters and Comics.
          <DisplayPromoted
            listofDICKSp={promotedFE}
            voteUp={VoteUp}
            voteDown={VoteDown}
          />
        </div>
      </colsaved>
    </div>
  );
}
Searcher.defaultProps = {
  userIdS: '',
};

Searcher.propTypes = {
  userIdS: String,
};
export default Searcher;
