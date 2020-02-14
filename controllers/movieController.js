const express = require('express');
const router = express.Router();
const Movie = require('../db/models/MovieModel');
const Rating = require('../db/models/RatingsModel');

router.get('/', (req, res) => {
  Movie.find({}).then(movies => {
    res.json(movies);
  });
});
router.post('/', (req, res) => {
  const newMovie = req.body;
  Movie.create(newMovie)
    .then(movie => res.json(movie))
    .catch(console.error);
});
router.get('/:id/rating', (req, res) => {
  let ratings = [];
  Movie.findById(req.params.id).then(movie => {
    movie.ratings.map(item => {
      Rating.findById(item).then(rating => ratings.push(rating));
    });
  });
  res.json(ratings);
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
router.get('/:id', (req, res) => {
  Movie.findById(req.params.id)
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
