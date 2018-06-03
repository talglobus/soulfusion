let express = require('express');
let async = require('async');
let get = {
	synonyms: require('../input/synonyms'),
	poems: require('../input/poems'),
	rhymes: require('../input/rhymes')
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
				images: [
					'https://images.unsplash.com/photo-1487235829740-e0ac5a286e1c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=310f7bfbbc76086f8259a5d197fcffb4&auto=format&fit=crop&w=1648&q=80',
					'https://images.unsplash.com/photo-1487235829740-e0ac5a286e1c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=310f7bfbbc76086f8259a5d197fcffb4&auto=format&fit=crop&w=1648&q=80',
					'https://images.unsplash.com/photo-1487235829740-e0ac5a286e1c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=310f7bfbbc76086f8259a5d197fcffb4&auto=format&fit=crop&w=1648&q=80'
				],
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
