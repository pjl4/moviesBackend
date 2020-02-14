const Movie = require('./models/MovieModel.js');

const seedData = require('./seeds.json');

Movie.deleteMany({})
  .then(() => {
    return Movie.collection.insertMany(seedData);
  })
  .then(() => {
    process.exit();
  });
