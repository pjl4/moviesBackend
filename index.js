const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;
const MovieController = require('./controllers/movieController');
const UserController = require('./controllers/userController');
const RatingController = require('./controllers/ratingsController');

// app.use(function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept'
// 	);
// 	next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/movies', MovieController);
app.use('/api/user', UserController);
app.use('/api/rating', RatingController);

app.listen(PORT, () => {
	console.log(`app running on ${PORT}`);
});
