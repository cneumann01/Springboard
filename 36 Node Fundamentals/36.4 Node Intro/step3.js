const fs = require("fs");
const axios = require("axios");

const arg1 = process.argv[2];
const arg2 = process.argv[3];
const arg3 = process.argv[4];
const arg4 = process.argv[5];

function checkForOutArg(text) {
	if (arg3) {
		if (arg3 != "-out") {
			throw new Error(
				"Unknown flag detected. Use -local or -web flag, followed by local file path/remote URL, followed by optional -out flag to output to file. EXAMPLE: node step3.js -local /usr/bin/example.txt -out"
			);
		}
		fs.writeFile(arg4, text, "utf8", function (err) {
			if (err) {
				console.error(`Couldn't write ${out}: ${err}`);
				process.exit(1);
			}
		});
	} else {
		console.log(data);
	}
}

async function cat(filePath) {
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) throw err;
		checkForOutArg(data);
	});
}

async function webCat(url) {
	axios.get(url).then(
		(response) => {
			if (response.status === 200) {
				checkForOutArg(response.data);
			}
		},
		(err) => console.log(err)
	);
}

if (arg1) {
	if (arg1 == "-local") {
		cat(arg2);
	} else if (arg1 == "-web") {
		webCat(arg2);
	} else {
		throw new Error(
			"Please use -local or -web flags to read from local file or remote site."
		);
	}
}
