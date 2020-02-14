const express = require('express');
const router = express.Router();
const Rating = require('../db/models/RatingsModel');

router.put('/:id', (req, res) => {
	Rating.findByIdAndUpdate(req.params.id, req.body)
		.then((rating) => res.json(rating))
		.catch((err) => console.log(err));
});
router.delete('/:id', (req, res) => {
	Rating.findByIdAndDelete(req.params.id)
		.then((rating) => res.json(rating))
		.catch((err) => console.log(err));
});
module.exports = router;
