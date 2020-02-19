const express = require('express');
const app = express();
const cors = require('cors');
const MovieController = require('./controllers/movieController');
const UserController = require('./controllers/userController');
const RatingController = require('./controllers/ratingsController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/movies', MovieController);
app.use('/api/user', UserController);
app.use('/api/rating', RatingController);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
