import React, { useState } from 'react';

// This component is for putting in form data

function SearchForm(props) {
  // States and function for radio
  const [heroRadioActive, setHeroActive] = useState(true);
  const [comicRadioActive, setComicActive] = useState(false);

  function setHeroRadio() {
    setHeroActive(true);
    setComicActive(false);
  }

  function setComicRadio() {
    setHeroActive(false);
    setComicActive(true);
  }

  // State and function for text
  const [formSearch, setSearch] = useState('');

  function updateSearch(e) {
    setSearch(e.target.value.trim());
  }

  function doStartsWithSearch() {
    props.onClick(formSearch, heroRadioActive);
  }
  return (
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
          onChange={updateSearch}
          maxLength="30"
        />
      </form>
      <button onClick={doStartsWithSearch} type="button">Starts-with search</button>
    </div>
  );
}
SearchForm.defaultProps = {
  onClick: () => {},
};
SearchForm.propTypes = {
  onClick: Function,
};
export default SearchForm;
