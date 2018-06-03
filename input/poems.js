/*
 * © 2018 Tal Globus. All Rights Reserved.
 */

let unirest = require('unirest');

module.exports = (word, cb) => {
	unirest.get("https://thundercomb-poetry-db-v1.p.mashape.com/title/" + word)
		.header("X-Mashape-Key", "uwLQtm1hwMmshgFUzTOXZuxE6ynXp1GnZCnjsnEufzrXKTcDN9")
		.end(function (result) {
			if (result.status === 200 && result.ok && !result.error) {
				console.log("https://thundercomb-poetry-db-v1.p.mashape.com/title/" + word);
				let results = [];
				results = results
					.concat(...result.body);
						// .map(x => x.titles)
					// .filter(x => typeof x !== "undefined");
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