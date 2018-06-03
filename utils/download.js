/*
 * © 2018 Tal Globus. All Rights Reserved.
 */

let fs = require('fs');
let request = require('request');

let download = function(uri, filename, callback){
	request.head(uri, function(err, res, body){
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);

		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

module.exports = download;