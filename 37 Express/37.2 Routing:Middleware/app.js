const express = require("express");
const routes = require('./routes')

const app = express();
app.use(express.json())

// Custom express error handling
export class expressError extends Error {
	constructor(message, status) {
		super();
		this.message = message;
		this.status = status;
		console.error(this.stack);
	}
}

app.use('/', routes)

// Error for no applicable routes found
app.get('*', (request, response, next) => {
	const error = new expressError(`404: ${request.path} - PAGE NOT FOUND`, 404)
	next(error)
})

// Collects all next() calls from server routes and displays error message to user.
app.use((error, response) => {
	response.status(error.code).send(error.message);
});

// PORTS
app.listen(3000, () => {
	console.log("Server running on port 3000");
});