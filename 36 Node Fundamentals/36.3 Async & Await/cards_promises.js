// Exercise 1
async function fetchNewDeck() {
	try {
		const response = await fetch(
			`https://deckofcardsapi.com/api/deck/new/shuffle`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching new deck:", error);
	}
}

async function fetchDrawCard(localDeckId) {
	try {
		const response = await fetch(
			`https://deckofcardsapi.com/api/deck/${localDeckId}/draw/?count=1`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error drawing card:", error);
	}
}

let deckId = 0;
fetchNewDeck().then(async (data) => {
	deckId = data.deck_id;

	const drawCardData = await fetchDrawCard(deckId);
	console.log("Exercise 1");
	console.log(
		`${drawCardData.cards[0].value} of ${drawCardData.cards[0].suit}`
	);
});

// Exercise 2
fetchNewDeck().then(async (data) => {
	deckId = data.deck_id;

	const drawCardData1 = await fetchDrawCard(deckId);
	console.log("Exercise 2");
	console.log(
		`${drawCardData1.cards[0].value} of ${drawCardData1.cards[0].suit}`
	);

	const drawCardData2 = await fetchDrawCard(deckId);
	console.log(
		`${drawCardData2.cards[0].value} of ${drawCardData2.cards[0].suit}`
	);
});

// Exercise 3
let exercise3DeckId = 0;
let deckEmpty = false;

fetchNewDeck().then((data) => {
	exercise3DeckId = data.deck_id;
});

$("#draw-card-btn").on("click", async function () {
	try {
		const drawCardData = await fetchDrawCard(exercise3DeckId);

		if (deckEmpty) {
			alert("Error: No cards remaining!");
			return;
		}

		$("#cards-remaining-text").text(
			`${drawCardData.remaining}/52 Cards Remaining`
		);
		console.log(drawCardData.cards[0]);

		$("#card-img").attr("src", drawCardData.cards[0].image);

		if (drawCardData.remaining === 0) {
			deckEmpty = true;
		}
	} catch (error) {
		console.error("Error drawing card:", error);
	}
});

$("#reset-deck-btn").on("click", async function () {
	try {
		const data = await fetchNewDeck();
		exercise3DeckId = data.deck_id;
		deckEmpty = false;
		$("#cards-remaining-text").text(`52/52 Cards Remaining`);
		$("#card-img").attr(
			"src",
			"https://deckofcardsapi.com/static/img/back.png"
		);
	} catch (error) {
		console.error("Error resetting deck:", error);
	}
});
