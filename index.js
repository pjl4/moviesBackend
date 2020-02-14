const express = require('express');
const app = express();
const PORT = 8080;
const MovieController = require('./controllers/movieController');
const UserController = require('./controllers/userController');
const RatingController = require('./controllers/ratingsController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/movies', MovieController);
app.use('/api/user', UserController);
app.use('/api/rating', RatingController);

app.listen(PORT, () => {
	console.log(`app running on ${PORT}`);
});
