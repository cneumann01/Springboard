const math = require("mathjs");
const express = require("express");
const app = express();

// HELPER FUNCTIONS
// Custom express error handling
class expressError extends Error {
	constructor(message, status) {
		super();
		this.message = message;
		this.status = status;
		console.error(this.stack);
	}
}

// arrayFromString() accepts an a inputString of items separated by commas and returns an array of each individual item.
// The function will convert each item to it's equivlant float value if the convertToFloat flag is set to true.
function arrayFromString(inputString, convertToFloat = false) {
	if (inputString.length == "") {
		throw new expressError(
			"Please input some numbers to do a calculation on.",
			400
		);
	}

	let outputArray = inputString.split(",");

	if (convertToFloat) {
		const newOutputArray = [];

		for (float of outputArray) {
			if (isNaN(float)) {
				throw new expressError(
					`${float} is not a number. Please try again using real numbers.`,
					400
				);
			}
			newOutputArray.push(parseFloat(float));
		}
		outputArray = newOutputArray;
	}
	return outputArray;
}

// ROUTES
// Takes string of numbers from request, passes them to the arrayFromString(), calculates their mean
app.get("/mean", (request, response, next) => {
	let numbersArray = [];
	try {
		numbersArray = arrayFromString(
			request.query.numbers,
			(convertToFloat = true)
		);
	} catch (error) {
		next(error);
	}

	return response.send(
		`The mean of the numbers you entered is ${math.mean(numbersArray)}.`
	);
});

// Takes string of numbers from request, passes them to the arrayFromString(), calculates their median
app.get("/median", (request, response, next) => {
	let numbersArray = [];
	try {
		numbersArray = arrayFromString(
			request.query.numbers,
			(convertToFloat = true)
		);
	} catch (error) {
		next(error);
	}

	return response.send(
		`The median of the numbers you entered is ${math.median(numbersArray)}.`
	);
});

app.get("/mode", (request, response, next) => {
	let numbersArray = [];
	try {
		numbersArray = arrayFromString(
			request.query.numbers,
			(convertToFloat = true)
		);
	} catch (error) {
		next(error);
	}
	return response.send(
		`The mode of the numbers you entered is ${math.mode(numbersArray)}.`
	);});

// Collects all next() calls from server routes and displays error message to user.
app.use((error, response) => {
	response.send(error.message);
});

// PORTS
app.listen(3000, () => {
	console.log("Server running on port 3000");
});
