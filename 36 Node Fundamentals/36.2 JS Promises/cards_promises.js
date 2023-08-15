// Exercise 1
function fetchNewDeck() {
	return fetch(`https://deckofcardsapi.com/api/deck/new/shuffle`).then(
		(response) => response.json()
	);
}

function fetchDrawCard(localDeckId) {
	return fetch(
		`https://deckofcardsapi.com/api/deck/${localDeckId}/draw/?count=1`
	).then((response) => response.json());
}

let deckId = 0;
fetchNewDeck().then((data) => {
	deckId = data.deck_id;

	fetchDrawCard(deckId).then((data) => {
        console.log('Exercise 1')
		console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
	});
});

// Exercise 2
fetchNewDeck().then((data) => {
    deckId = data.deck_id;

    fetchDrawCard(deckId).then((data) => {
        console.log('Exercise 2')
        console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
    });

    fetchDrawCard(deckId).then((data) => {
        console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
    });

});

// Exercise 3
let exercise3DeckId = 0;
let deckEmpty = false;

fetchNewDeck().then((data) => {
    exercise3DeckId = data.deck_id;
});

$("#draw-card-btn").on("click", function () {
    fetchDrawCard(exercise3DeckId).then((data) => {
        if (deckEmpty) {
            alert("Error: No cards remaining!");
            return;
        }
        $('#cards-remaining-text').text(`${data.remaining}/52 Cards Remaining`)
        console.log(data.cards[0])

        $("#card-img").attr("src", data.cards[0].image);

        if (data.remaining === 0) {
            deckEmpty = true;
        }
    });
});

$("#reset-deck-btn").on("click", function () {
    fetchNewDeck().then((data) => {
        exercise3DeckId = data.deck_id;
        deckEmpty = false;
        $('#cards-remaining-text').text(`52/52 Cards Remaining`)
        $("#card-img").attr("src", "https://deckofcardsapi.com/static/img/back.png");
    });
}); 
