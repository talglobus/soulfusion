let express = require('express');
let async = require('async');
let get = {
	synonyms: require('../input/synonyms'),
	poems: require('../input/poems'),
	rhymes: require('../input/rhymes'),
	images: require('../input/images')
};
let router = express.Router();

/* GET users listing. */
router.get('/:word', function(req, res, next) {
	req.header('Access-Control-Allow-Origin: *');
	let word = req.params.word || "random";		// TODO: Fix this
	async.parallel({
		synonyms: get.synonyms.bind(null, word),
		poems: get.poems.bind(null, word),
		rhymes: get.rhymes.bind(null, word),
		images: get.images.bind(null, word),
		two: function(callback) {
			setTimeout(function() {
				callback(null, 2);
			}, 100);
		}
	}, function(err, results) {
		res.json({
			status: true,
			data: {
				synonyms: results.synonyms,
				quotes: [
					"love is blind",
					"I love you",
					"It is my lady. Oh, it is my love"
				],
				images: results.images,
				rhymes: results.rhymes,
				poems: results.poems
				// 	`I burned with love in
				// 	empty rooms, I sternly turned
				// 	knives within myself.`
				// ]
			}
		});
	});
});

module.exports = router;
