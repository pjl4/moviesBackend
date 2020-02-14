const mongoose = require('../connection');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }
  ],
  avgRating: {
    type: Number,
    default: 0
  }
});
const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
