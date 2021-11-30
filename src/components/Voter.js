function Searcher() {
    function VoteUp(hero_id) {
    fetch('/voteUpHero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ heroToSearch: hero_id}),
        })
            .then((response) => response.json())
            .then((searchResult) => {
            // DONT HAVE TO DO ANYTHING HERE, SHOULD UPDATE IN DATABASE
            console.log(searchResult);
        });
    }

    function VoteDown(hero_id) {
        fetch('/voteDownHero', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ heroToSearch: hero_id}),
        })
            .then((response) => response.json())
            .then((searchResult) => {
            // DONT HAVE TO DO ANYTHING HERE, SHOULD UPDATE IN DATABASE
            console.log(searchResult);
        });
    }

    return (
        <div>

        </div>
    );
}