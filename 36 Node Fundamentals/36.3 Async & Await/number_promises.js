// Exercise 1 of 3
async function fetchNumberFact(number) {
	try {
		const response = await fetch(`http://numbersapi.com/${number}?json`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching number fact:", error);
	}
}

$("#number-fact-btn").on("click", async function () {
	const number = $("#number-fact-input").val();
	const data = await fetchNumberFact(number);
	$("#number-fact-text").text(data.text);
});

// Exercise 2 of 3
async function fetchMultipleNumberFacts(numbers) {
	const promises = numbers.map((number) => fetchNumberFact(number));
	return await Promise.all(promises);
}

async function displayMultipleNumberFacts() {
	const numbers = getRandomNumbers(3);
	const data = await fetchMultipleNumberFacts(numbers);
	const factsDiv = $("#multiple-number-facts-div");
	for (const fact of data) {
		factsDiv.append(`<p>${fact.text}</p>`);
	}
}

// Exercise 3 of 3
async function fetchMultipleFactsForNumber(number, quantity) {
	const promises = [];
	for (let i = 0; i < quantity; i++) {
		promises.push(fetchNumberFact(number));
	}
	return await Promise.all(promises);
}

async function displayMultipleFactsForNumber() {
	const number = getRandomNumbers(1)[0];
	const quantity = 3;
	const data = await fetchMultipleFactsForNumber(number, quantity);
	const factsDiv = $("#multiple-facts-about-number-div");
	for (const fact of data) {
		factsDiv.append(`<p>${fact.text}</p>`);
	}
}

// Helper function
function getRandomNumbers(howMany) {
	const numberArray = [];
	for (let i = 0; i < howMany; i++) {
		numberArray.push(Math.floor(Math.random() * 100));
	}
	return numberArray;
}

displayMultipleNumberFacts()
displayMultipleFactsForNumber()
