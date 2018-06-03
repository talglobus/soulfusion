/*
 * © 2018 Tal Globus. All Rights Reserved.
 */

let unirest = require('unirest');
let isProfane = require('../utils/isProfane');

let uniq = a => {
	let prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

	return a.filter(function(item) {
		let type = typeof item;
		if(type in prims)
			return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
		else
			return objs.indexOf(item) >= 0 ? false : objs.push(item);
	});
};

module.exports = (word, cb) => {
	unirest.get(`https://wordsapiv1.p.mashape.com/words/${word}`)
		.header("X-Mashape-Key", "uwLQtm1hwMmshgFUzTOXZuxE6ynXp1GnZCnjsnEufzrXKTcDN9")
		.header("Accept", "application/json")
		.end(function (result) {
			if (result.status === 200 && result.ok && !result.error) {
				let results = [];
				results = results
					.concat(...result.body.results
						.map(x => x.synonyms)
						.filter(x => typeof x !== "undefined"))
					.filter(x => !isProfane(x));
				results = uniq(results);
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