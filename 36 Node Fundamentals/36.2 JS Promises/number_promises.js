// Exercise 1 of 3
function fetchNumberFact(number) {
	return fetch(`http://numbersapi.com/${number}?json`).then((response) =>
		response.json()
	);
}

$("#number-fact-btn").on("click", function () {
	fetchNumberFact($('#number-fact-input').val()).then((data) => {
		$("#number-fact-text").text(data.text);
	});
});

// Exercise 2 of 3
function fetchMultipleNumberFacts(numbers) {
	const promises = numbers.map((number) => fetchNumberFact(number));
	return Promise.all(promises);
}

function getRandomNumbers(howMany) {
	const numberArray = [];
	for (let i = 0; i < howMany; i++) {
		numberArray.push(Math.floor(Math.random() * 100));
	}
	return numberArray;
}

fetchMultipleNumberFacts(getRandomNumbers(3)).then((data) => {
	for (const number in data) {
		$("#multiple-number-facts-div").append(`<p>${data[number].text}</p>`);
	}
});

// Exercise 3 of 3
function fetchMultipleFactsForNumber(number, quantity) {
	for (let i = 0; i < quantity; i++) {
		fetchNumberFact(number).then((data) => {
			$("#multiple-facts-about-number-div").append(`<p>${data.text}</p>`);
		});
	}
}

function fetchMultipleFactsForNumber(number, quantity) {
	const promises = [];
	for (let i = 0; i < quantity; i++) {
		promises.push(fetchNumberFact(number));
	}
	return Promise.all(promises);
}

fetchMultipleFactsForNumber(getRandomNumbers(1), 3).then((data) => {
	for (const fact in data) {
		$("#multiple-facts-about-number-div").append(`<p>${data[fact].text}</p>`);
	}
});

