/*
 * © 2018 Tal Globus. All Rights Reserved.
 */

let unirest = require('unirest');
let isProfane = require('../utils/isProfane');

module.exports = (word, cb) => {
	unirest.get("https://thundercomb-poetry-db-v1.p.mashape.com/title/" + word)
		.header("X-Mashape-Key", "uwLQtm1hwMmshgFUzTOXZuxE6ynXp1GnZCnjsnEufzrXKTcDN9")
		.end(function (result) {
			if (result.status === 200 && result.ok && !result.error && typeof result.body[0] !== "undefined") {
				let results = result.body
						// .map(x => x.titles)
					.filter(x => x.lines.length < 16)
					.filter(poem => poem.lines.filter(line => !isProfane(line)).length === poem.lines.length);
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