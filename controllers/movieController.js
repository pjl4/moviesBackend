const express = require('express');
const router = express.Router();
const Movie = require('../db/models/MovieModel');
const Rating = require('../db/models/RatingsModel');

router.get('/', (req, res) => {
  if (req.query.genre) {
    Movie.find({ genre: req.query.genre }).then(movies => {
      res.json(movies);
    });
  } else {
    Movie.find({}).then(movies => {
      res.json(movies);
    });
  }
});
router.post('/', (req, res) => {
  const newMovie = req.body;
  Movie.create(newMovie)
    .then(movie => res.json(movie))
    .catch(console.error);
});

router.get('/:id/rating', async (req, res) => {
  const movieRatings = await Movie.findById(req.params.id).populate('ratings');
  res.json(movieRatings.ratings);
});

router.post('/:id/rating', (req, res) => {
  Rating.create(req.body).then(rating => {
    Movie.findById(req.params.id).then(movie => {
      movie.ratings.push(rating);
      movie.save();
      res.json(movie);
    });
  });
});

router.get('/:id', async (req, res) => {
  const movieRatings = await Movie.findById(req.params.id).populate('ratings');
  const reducer = (a, c) => a + c.rating;
  const length = movieRatings.ratings.length;
  const sum = movieRatings.ratings.reduce(reducer, 0);
  const average = length > 0 ? sum / length : 0;
  Movie.findByIdAndUpdate(
    req.params.id,
    { avgRating: average.toFixed(2) },
    { new: true }
  )
    .then(movie => res.json(movie))
    .catch(console.error);
});
router.put('/:id', (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(movie => res.json(movie))
    .catch(console.error);
});
router.delete('/:id', (req, res) => {
  Movie.findOneAndDelete({ _id: req.params.id })
    .then(movie => res.json(movie))
    .catch(console.error);
});

module.exports = router;
