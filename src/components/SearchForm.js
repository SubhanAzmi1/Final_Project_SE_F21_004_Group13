import React, { useState, useRef } from 'react';

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
  const textInput = useRef(null);
  function doStartsWithSearch() {
    const textToSearch = textInput.current.value;
    props.setTts(textToSearch);
    props.setIsHero(heroRadioActive);
    console.log(textToSearch);
    props.onClick(heroRadioActive);
    textInput.current.value = '';
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
          ref={textInput}
          maxLength="45"
        />
      </form>
      <button onClick={doStartsWithSearch} type="button">Starts-with search</button>
    </div>
  );
}
SearchForm.defaultProps = {
  onClick: () => {},
  setTts: () => {},
  setIsHero: () => {},
};
SearchForm.propTypes = {
  onClick: Function,
  setTts: Function,
  setIsHero: Function,
};
export default SearchForm;
