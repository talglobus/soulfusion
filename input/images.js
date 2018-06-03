/*
 * © 2018 Tal Globus. All Rights Reserved.
 */

const CLOUDINARY_URL_PREFIX = require('../config/cloudinary');

let unirest = require('unirest');
let async = require('async');
let config = require('../config/unsplash');
let download = require('../utils/download');
let cache = {};

module.exports = (text, cb) => {
	if (Object.keys(cache).indexOf(text) !== -1) {
		console.log("Retrieving cached image results");
		cb(cache[text].err, cache[text].res);
	} else {
		console.log("Fetching new image results");
		unirest.get(`https://api.unsplash.com/search/photos?query=${
			text}&page=1&per_page=30&client_id=${config.ACCESS_KEY}`)
			.end(function (result) {
				if (result.status === 200 && result.ok && !result.error) {
					let output = result.body.results.map(img => ({
						width: img.width,
						height: img.height,
						color: img.color,
						urls: {
							raw: CLOUDINARY_URL_PREFIX + img.urls.raw,
							full: CLOUDINARY_URL_PREFIX + img.urls.full,
							regular: CLOUDINARY_URL_PREFIX + img.urls.regular,
							small: CLOUDINARY_URL_PREFIX + img.urls.small,
							thumb: CLOUDINARY_URL_PREFIX + img.urls.thumb
						},
						user: img.user
					}));
					cache[text] = {
						err: null,
						res: output
					};
					cb(null, output);
				} else if (result.status === 404) {
					console.log("Results not found");
					cache[text] = {
						err: null,
						res: []
					};
					cb(null, []);
				} else {
					cb(result.error);
				}
			});
	}
};