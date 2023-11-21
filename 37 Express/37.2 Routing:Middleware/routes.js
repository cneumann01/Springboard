const express = require("express");
const items = require("./fakeDb");
const router = new express.Router();
const expressError = require();

router.get("/items", (request, response) => {
	return response.json(items);
});

router.post("/items", (request, response) => {
	const name = request.query.name;
	const price = request.query.price;
	const newItem = { name: name, price: price };
	items.push(newItem);
	return response.json({ added: newItem });
});

router.get("/items/:name", (request, response) => {
	const nameToLocate = request.params.name;
	const item = items.find((item) => item.name.includes(nameToLocate));
	if (item) {
		return response.json(item);
	}
	return response.json(`${nameToLocate} not found!`);
});

router.patch("/items/:name", (request, response, next) => {
	const nameToLocate = request.params.name;
	const itemToModifyIndex = items.findIndex((item) =>
		item.name.includes(nameToLocate)
	);
	if (itemToModifyIndex && itemToModifyIndex != -1) {
		const name = request.query.name;
		const price = request.query.price;
		const updatedItem = { name: name, price: price };
		items[itemToModifyIndex] = updatedItem;
		return response.json({ updated: updatedItem });
	} else {
		const error = new expressError(`${nameToLocate} not found!`, 404);
        next(error)
	}
});

router.delete("/items/:name", (request, response) => {
	const nameToLocate = request.params.name;
	const itemIndexToDelete = items.findIndex((item) =>
		item.name.includes(nameToLocate)
	);
	if (itemIndexToDelete && itemIndexToDelete != -1) {
		const itemToDelete = items[itemIndexToDelete];
		items.splice(itemIndexToDelete, 1);
		return response.json({ deleted: itemToDelete });
	}
	return response.json(`${nameToLocate} not found!`);
});

module.exports = router;
