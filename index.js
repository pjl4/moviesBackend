const express = require('express');
const app = express();
const PORT = 8080;
const MovieController = require('./controllers/movieController');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/movies', MovieController);

app.listen(PORT, () => {
	console.log(`app running on ${PORT}`);
});
