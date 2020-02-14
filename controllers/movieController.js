const express = require('express');
const router = express.Router();
const Movie = require('../db/models/MovieModel');

router.get('/', (req, res) => {
	Movie.find({}).then((movies) => {
		res.json(movies);
	});
});

module.exports = router;
