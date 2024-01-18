const bookSchema = {
	type: "object",
	properties: {
		isbn: {
			type: "string",
			pattern: "^[0-9]{10}$",
		},
		amazon_url: {
			type: "string",
			format: "uri",
		},
		author: {
			type: "string",
		},
		language: {
			type: "string",
		},
		pages: {
			type: "integer",
			minimum: 1,
		},
		publisher: {
			type: "string",
		},
		title: {
			type: "string",
		},
		year: {
			type: "integer",
			minimum: 1000,
			maximum: 9999,
		},
	},
	required: [
		"isbn",
		"amazon_url",
		"author",
		"language",
		"pages",
		"publisher",
		"title",
		"year",
	],
};

module.exports = bookSchema;
