let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json({
		status: true,
		data: {
			synonyms: [
				"affection",
				"appreciation",
				"devotion",
				"emotion",
				"fondness",
				"friendship",
				"infatuation",
				"lust",
				"passion",
				"respect",
				"taste",
				"tenderness",
				"yearning",
				"adulation",
				"allegiance",
				"amity",
				"amorousness",
				"amour",
				"ardor",
				"attachment"
			],
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
			rhymes: [
				'of',
				'above',
				'dove',
				'shove',
				'glove',
				'thereof',
				'belove',
				'labov',
				'in terms of',
				'gov'
			],
			poems: [
					`I burned with love in
					empty rooms, I sternly turned
					knives within myself.`
			]
		}
	});
});

module.exports = router;
