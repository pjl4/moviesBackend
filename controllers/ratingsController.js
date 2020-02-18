const express = require('express');
const router = express.Router();
const Rating = require('../db/models/RatingsModel');
const Movie = require('../db/models/MovieModel');

router.put('/:id', (req, res) => {
	Rating.findByIdAndUpdate(req.params.id, req.body)
		.then((rating) => res.json(rating))
		.catch((err) => console.log(err));
});
router.delete('/:id', (req, res) => {
	Rating.findByIdAndDelete(req.params.id)
		.then((rating) => {
			Movie.findById(req.body.id).then((movie) => {
				let ratingIndex = movie.ratings.find(
					(item) => item === rating._id
				);
				movie.ratings.splice(movie.ratings.indexOf(ratingIndex), 1);
				movie.save();
			});
			res.json(rating);
		})
		.catch((err) => console.log(err));
});
module.exports = router;
