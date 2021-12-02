// This component is for putting in form data for crossover search

function SearchCompareForm(props) {
  // State and function for text
  const textInput1 = useRef(null);
  const textInput2 = useRef(null);

  function doCrossoverSearch() {
    const textToSearch1 = textInput1.current.value;
    props.setHeroOne(textToSearch1);

    const textToSearch2 = textInput2.current.value;
    props.setHeroTwo(textToSearch2);

    props.onClick();
      
      textInput1.current.value = '';
      textInput2.current.value = '';
      
      
      fetch('/marvelLookupCrossovers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ heroOne: textToSearch1, 
                                 heroTwo: textToSearch2 }),
      })
          .then((response) => response.json())
          .then((searchResult) => {
          // SEND OVER TO DISPLAY CROSSOVERS
          props.setCrossovers(searchResult);
          });
      }
  
    return (
      <div>
        <h2>
          Enter a hero crossover here! (Note: both textboxes must be Hero IDs!)
        </h2>
        <form>
          <label htmlFor="hero1"/>
          <input
            type="text"
            placeholder="Hero One's ID Here"
            ref={textInput1}
            maxLength="45"
            id="hero1"/>
        </form><br/>
          <form>
          <label htmlFor="hero2"/>
          <input
            type="text"
            placeholder="Hero Two's ID Here"
            ref={textInput2}
            maxLength="45"
            id="hero2"
          /><br/>
        </form>
        <button onClick={doCrossoverSearch} type="button">Starts-with search</button>
      </div>
    );
  }
  SearchCompareForm.defaultProps = {
    onClick: () => {},
    setHeroOne: () => {},
    setHeroTwo: () => {}
  };
  SearchCompareForm.propTypes = {
    onClick: Function,
    setHeroOne: Function,
    setHeroTwo: Function
  };
  export default SearchCompareForm;