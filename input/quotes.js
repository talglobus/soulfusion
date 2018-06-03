/*
 * © 2018 Tal Globus. All Rights Reserved.
 */

let unirest = require('unirest');

module.exports = (word, cb) => {
	unirest.get(`https://en.wikiquote.org/w/api.php?action=opensearch&search=${word}`)
		.header("Accept", "application/json")
		.end(function (result) {
			if (result.status === 200 && result.ok && !result.error) {
				let results = [];
				results = results
					.concat(...result.body
						.filter(x => typeof x !== "undefined"));
				// results = uniq(results);
				cb(null, results);
			} else if (result.status === 404) {
				console.log("Not found");
				cb(null, []);
			} else {
				console.log(result.error);
				cb(result.error);
			}
		});
};