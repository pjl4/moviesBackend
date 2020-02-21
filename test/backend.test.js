// require dependencies
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
// set up our supertest to hit our local server later on
const api = supertest('http://localhost:8080');

//movie Tests needed
describe('GET /api/movies', () => {
	it('should return a 200 response', (done) => {
		api.get('/api/movies')
			.set('Accept', 'application/json')
			.expect(200, done);
	});
	//get all movies
	it('should return an array', (done) => {
		api.get('/api/movies')
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('array');
				done();
			});
	});
	//get all movies by genre
	it('should return comedies', (done) => {
		api.get('/api/movies?genre=Comedy')
			.set('Accept', 'application/json')
			.end((error, response) => {
				response.body.forEach((movie) => {
					expect(movie.genre).to.equal('Comedy');
				});
				done();
			});
	});
});
//create new user
describe('POST /api/user', () => {
	let user;
	const newUser = {
		userName: 'backendTesting',
		email: 'backendTesting@test.com',
		password: 'password'
	};
	it('should create a newUser and return it', (done) => {
		api.post('/api/user')
			.set('Accept', 'application/json')
			.send(newUser)
			.end((error, response) => {
				user = response.body;
				expect(user).to.include.all.keys(
					'_id',
					'userName',
					'email',
					'password'
				);
				done();
			});
	});
});
//post to login
describe('POST /api/user/login', () => {
	let user;
	const userLoginInfo = {
		email: 'backendTesting@test.com',
		password: 'password'
	};
	it('should return the user', (done) => {
		api.post('/api/user/login')
			.set('Accept', 'applications/json')
			.send(userLoginInfo)
			.end((error, response) => {
				user = response.body;
				expect(response.body).to.eql(user);
				done();
			});
	});
});

//post movie
describe('POST /movies', () => {
	let newMovie;
	let user;
	before((done) => {
		const userLoginInfo = {
			email: 'backendTesting@test.com',
			password: 'password'
		};
		api.post('/api/user/login')
			.set('Accept', 'applications/json')
			.send(userLoginInfo)
			.end((error, response) => {
				user = response.body;
				newMovie = {
					title: 'testTitle',
					synopsis: 'testSynopsis',
					genre: 'testGenre',
					createdBy: user._id
				};
				done();
			});
	});
	before((done) => {
		api.post('/api/movies')
			.set('Accept', 'application/json')
			.send(newMovie)
			.end((err, res) => {
				done();
			});
	});

	it('should add a movie and return it', (done) => {
		api.get('/api/movies')
			.set('Accept', 'application/json')
			.end((error, response) => {
				const movieToFind = response.body.find(
					(movie) => movie.title === newMovie.title
				);
				expect(movieToFind).to.be.an('object');
				done();
			});
	});
});
//post rating to movie
describe('POST /api/movies/id/rating', () => {
	const newRating = { rating: 8 };
	let idToQuery;
	before((done) => {
		api.get('/api/movies')
			.set('Accept', 'application/json')
			.end((error, response) => {
				const movies = response.body;
				idToQuery = movies[movies.length - 1]._id;
				done();
			});
	});
	it('should have a ratings array', (done) => {
		api.post(`/api/movies/${idToQuery}/rating`)
			.set('Accept', 'application/json')
			.send(newRating)
			.end((err, res) => {
				expect(res.body.ratings).to.be.an('array');
				done();
			});
	});

	// 	api.get(`/api/movies/${idToQuery}`)
	// 		.set('Accept', 'application/json')
	// 		.end((error, response) => {
	// 			const movie = response.body;
	// 			console.log(movie);
	// 			expect(movie.ratings)
	// 			done();
	// 		});
	// });
});
//get all ratings from movie
describe('GET /api/movies/:id/rating', () => {
	let idToQuery;
	before((done) => {
		api.get('/api/movies')
			.set('Accept', 'application/json')
			.end((error, response) => {
				const movies = response.body;
				idToQuery = movies[movies.length - 1]._id;
				done();
			});
	});
	it('should return a movies ratings', (done) => {
		api.get(`/api/movies/${idToQuery}/rating`)
			.set('Accept', 'application/json')
			.end((error, response) => {
				const ratings = response.body;
				expect(ratings).to.be.an('array');
				done();
			});
	});
});
//get movie by id
describe('GET /api/movies/:id', () => {
	let idToQuery;
	before((done) => {
		api.get('/api/movies')
			.set('Accept', 'application/json')
			.end((error, response) => {
				const movies = response.body;
				idToQuery = movies[movies.length - 1]._id;
				done();
			});
	});
	it('should return the last movie object', (done) => {
		api.get(`/api/movies/${idToQuery}`)
			.set('Accept', 'application/json')
			.timeout(10000)
			.end((error, response) => {
				const movie = response.body;
				expect(movie).to.include.all.keys('_id', 'userName', 'movie');
				done();
			});
	});
});
//delete movie
describe('DELETE /api/movie', () => {
	const newMovie = {
		title: 'testTitle',
		synopsis: 'testSynopsis',
		genre: 'testGenre'
	};
	before((done) => {
		api.post('/api/movies')
			.set('Accept', 'application/json')
			.send(newMovie)
			.end(done);
	});
	let idToDelete;
	before((done) => {
		api.get('/api/movies')
			.set('Accept', 'application/json')
			.end((error, response) => {
				const movies = response.body;
				idToDelete = movies[movies.length - 1]._id;
				done();
			});
	});
	before((done) => {
		api.delete(`/api/movies/${idToDelete}`)
			.set('Accept', 'application/json')
			.end((error, respons) => {
				done();
			});
	});
	it('should remove movie from database', (done) => {
		api.get('/api/movies')
			.set('Accept', 'application/json')
			.end((error, response) => {
				const deletedMovie = response.body.find(
					(movie) => movie._id === idToDelete
				);
				expect(deletedMovie).to.equal(undefined);
				done();
			});
	});
});
//update rating by ID
describe('PUT /api/rating/:id', () => {
	const newRating = { rating: 3 };
	let idToQuery;
	let idToUpdate;
	before((done) => {
		api.get('/api/movies')
			.set('Accept', 'application/json')
			.end((error, response) => {
				const movies = response.body;
				idToQuery = movies[movies.length - 1]._id;
				done();
			});
	});
	before((done) => {
		api.get(`/api/movies/${idToQuery}/rating`)
			.set('Accept', 'application/json')
			.end((error, response) => {
				const ratings = response.body;
				idToUpdate = ratings[ratings.length - 1]._id;
				done();
			});
	});

	it('should update a rating by id', (done) => {
		api.put(`/api/rating/${idToUpdate}`)
			.set('Accept', 'application/json')
			.send(newRating)
			.end((error, response) => {
				const rating = response.body;
				expect(rating.rating).to.equal(newRating.rating);
				done();
			});
	});
});

//User tests needed

//find movies created by user
describe('GET /api/user/:id', () => {
	let movieToDelete = {
		title: 'Cheesecake',
		synopsis:
			'A couple goes out on a date to get cheesecake and they fall in love.',
		genre: 'Romance'
	};
	let user;

	before((done) => {
		const userLoginInfo = {
			email: 'backendTesting@test.com',
			password: 'password'
		};
		api.post('/api/user/login')
			.set('Accept', 'applications/json')
			.send(userLoginInfo)
			.end((error, response) => {
				user = response.body;
				done();
			});
	});
	before((done) => {
		api.post('/api/movies')
			.set('Accept', 'application/json')
			.send(movieToDelete)
			.end((error, response) => {
				movieToDelete = response.body;
				done();
			});
	});

	it('should return movies created by the user', (done) => {
		api.get(`/api/user/${user._id}`)
			.set('Accept', 'application/json')
			.end((error, response) => {
				const movies = response.body.movies;
				let bool = true;
				movies.forEach((movie) => {
					movie.createdBy !== user._id
						? (bool = false)
						: (bool = true);
				});
				expect(bool).to.be.equal(true);
				done();
			});
	});

	after((done) => {
		api.delete(`/api/movies/${movieToDelete._id}`)
			.set('Accept', 'application/json')
			.end((err, res) => {
				done();
			});
	});
});
//delete a user
describe('DELETE /api/user/:id', () => {
	let user;
	const userLoginInfo = {
		email: 'backendTesting@test.com',
		password: 'password'
	};
	before((done) => {
		api.post('/api/user/login')
			.set('Accept', 'applications/json')
			.send(userLoginInfo)
			.end((error, response) => {
				user = response.body;

				done();
			});
	});
	it('should remove user from database and return it', (done) => {
		api.delete(`/api/user/${user._id}`)
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.eql(user);
				done();
			});
	});
});
