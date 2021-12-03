// WOULD MOVE FUNCTIONS UP, BUT ALREADY DID 

function Promoter(props) {
    function VoteUp() {
    fetch('/voteUpHero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ heroId: props.heroId}),
        })
            .then((response) => response.json())
            .then((searchResult) => {
            // UPDATE RESULTS TO FRONT END
        });
    }

    function VoteDown() {
        fetch('/voteDownHero', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ heroId: props.heroId}),
        })
            .then((response) => response.json())
            .then((searchResult) => {
            // UPDATE RESULTS TO FRONT END
        });
    }

    return (
        <div>
            <button onClick = {VoteUp()}>Promote Up</button>
            <button onClick = {VoteDown()}>Promote Down</button>
        </div>
    );
}
Promoter.defaultProps = {
  heroId: '',
};

Promoter.propTypes = {
  heroId: String
};

export default Promoter;
