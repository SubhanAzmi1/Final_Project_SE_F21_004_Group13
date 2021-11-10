import React from 'react';
import {useState} from 'react';

// This component is for putting in form data

function SearchForm(props) {
  // States and function for radio
  const [heroRadioActive, setHeroActive] = useState(true);
  const [comicRadioActive, setComicActive] = useState(false);

  function setHeroRadio(e) {
    setHeroActive(true);
    setComicActive(false);
  }

  function setComicRadio(e) {
    setHeroActive(false);
    setComicActive(true);
  }

  // State and function for text
  const [formSearch, setSearch] = useState("");

  function updateSearch(e) {
    setSearch(e.target.value.trim());
  }

  function doSearch() {
    props.onClick(formSearch, heroRadioActive);
  }

  return (
    <div>
      <h2>Enter a hero or comic issue here!</h2>
      <form>
          <input 
            type="radio"
            value="Hero"
            name="Selection"
            id="hero"
            onChange={ setHeroRadio }
            checked={heroRadioActive}
          />
          <label for="hero">Hero</label>
          <br/>

          <input 
            type="radio" 
            value="Comic"
            name="Selection"
            id="comic"
            onChange={ setComicRadio }
            checked={comicRadioActive}
          />
          <label for="comic">Comic</label>
          <br/>
      </form>
      <form>
          <input type="text" 
            placeholder="Hero or Comic Name Here" 
            onChange={ updateSearch } 
            maxlength="30"
          />
      </form>
      <button onClick={ doSearch }>Search</button>
    </div>
  )
}

export default SearchForm;