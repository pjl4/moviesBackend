// require dependencies
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
// set up our supertest to hit our local server later on
const api = supertest('http://localhost:8080');

//movie Tests needed
describe('GET /api/movies', () => {
  it('should return a 200 response', done => {
    api
      .get('/api/movies')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  //get all movies
  it('should return an array', done => {
    api
      .get('/api/movies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body).to.be.an('array');
        done();
      });
  });
  //get all movies by genre
  it('should return comedies', done => {
    api
      .get('/api/movies?genre=Comedy')
      .set('Accept', 'application/json')
      .end((error, response) => {
        response.body.forEach(movie => {
          expect(movie.genre).to.equal('Comedy');
        });
        done();
      });
  });
});
//post movie
describe('POST /movies', () => {
  const newMovie = {
    title: 'testTitle',
    synopsis: 'testSynopsis',
    genre: 'testGenre'
  };
  before(done => {
    api
      .post('/api/movies')
      .set('Accept', 'application/json')
      .send(newMovie)
      .end(done);
  });
  it('should add a movie and return it', done => {
    api
      .get('/api/movies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const movieToFind = response.body.find(
          movie => movie.title === newMovie.title
        );
        expect(movieToFind).to.be.an('object');
        done();
      });
  });
});
//get all ratings from movie
describe('GET /api/movies/:id', () => {
  let idToQuery;
  before(done => {
    api
      .get('/api/movies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const movies = response.body;
        idToQuery = movies[movies.length - 1]._id;
        done();
      });
  });
  it('should return a movies ratings', done => {
    api
      .get(`/api/movies/${idToQuery}/rating`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        const movie = response.body;
        expect(movie.ratings).to.be.an('object');
        done();
      });
  });
});
//post rating to movie
describe('POST /api/movies/id/rating', () => {
  const newRating = { rating: 8 };
  let idToQuery;
  before(done => {
    api
      .get('/api/movies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const movies = response.body;
        idToQuery = movies[movies.length - 1]._id;
        done();
      });
  });
  before(done => {
    api
      .post(`/api/movies/${idToQuery}/rating`)
      .set('Accept', 'application/json')
      .send(newRating)
      .end(done);
  });
  it('should have a rating of 8', done => {
    api
      .get(`/api/movies/${idToQuery}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        const movie = response.body;
        expect(movie.ratings[0].rating).to.equal(newRating.rating);
        end(done);
      });
  });
});
//get movie by id
describe('GET /api/movies/:id', () => {
  let idToQuery;
  before(done => {
    api
      .get('/api/movies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const movies = response.body;
        idToQuery = movies[movies.length - 1]._id;
        done();
      });
  });
  it('should return the last movie object', done => {
    api
      .get(`/api/movies/${idToQuery}`)
      .set('Accept', 'application/json')
      .end((error, resonse) => {
        const movie = response.body;
        expect(movie).to.include.all.keys('_id', 'title', 'synopsis', 'genre');
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
  before(done => {
    api
      .post('/api/movies')
      .set('Accept', 'application/json')
      .send(newMovie)
      .end(done);
  });
  let idToDelete;
  before(done => {
    api
      .get('/api/movies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const movies = response.body;
        idToDelete = movies[movies.length - 1]._id;
        done();
      });
  });
  before(done => {
    api
      .delete(`/api/movies/${idToDelete}`)
      .set('Accept', 'application/json')
      .end((error, respons) => {
        done();
      });
  });
  it('should remove movie from database', done => {
    api
      .get('/api/movies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const deletedMovie = response.body.find(
          movie => movie._id === idToDelete
        );
        expect(deletedMovie).to.equal(undefined);
        done();
      });
  });
});
//update rating by ID
describe('PUT /api/rating/:id', () => {
  const newRating = { rating: 8 };
  let idToQuery;
  let idToUpdate;
  before(done => {
    api
      .get('/api/movies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        const movies = response.body;
        idToQuery = movies[movies.length - 1]._id;
        done();
      });
  });
  before(done => {
    api
      .post(`/api/movies/${idToQuery}/rating`)
      .set('Accept', 'application/json')
      .send(newRating)
      .end(done);
  });
  before(done => {
    api
      .get(`/api/movies/${idToQuery}/rating`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        const movie = response.body;
        idToUpdate = movie.ratings[movie.ratings.length - 1]._id;
        done();
      });
  });

  it('should update a rating by id', done => {
    api
      .put(`/api/rating/${idToUpdate}`)
      .set('Accept', 'application/json')
      .send(newRating)
      .end((error, response) => {
        const rating = response.body;
        expect(rating.rating).to.equal(newRating.rating);
      });
  });
});

//User tests needed
//create new user
let user;
describe('POST /api/user', () => {
  const newUser = {
    userName: 'backendTesting',
    email: 'backendTesting@test.com',
    password: 'password'
  };
  it('should create a newUser and return it', done => {
    api
      .post('/api/user')
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
  const userLoginInfo = {
    email: 'backendTesting@test.com',
    password: 'password'
  };
  it('should return the user', done => {
    api
      .post('api/user/login')
      .set('Accept', 'applications/json')
      .send(userLoginInfo)
      .end((error, response) => {
        expect(response.body).to.eql(user);
      });
  });
});
//find movies created by user
describe('GET /api/user/:id', () => {
  let movieToDelete = {
    title: 'Cheesecake',
    synopsis:
      'A couple goes out on a date to get cheesecake and they fall in love.',
    genre: 'Romance',
    createdBy: user._id
  };
  before(done => {
    api
      .post('/api/movie')
      .set('Accept', 'application/json')
      .send(movieToDelete)
      .end((error, response) => {
        movieToDelete = response.body;
        done();
      });
  });
  it('should return movies created by the user', done => {
    api
      .get(`/api/user/${user._id}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body.movies[0]).to.eql(movieToDelete);
        done();
      });
  });
});
//delete a user
describe('DELETE /api/user/:id', () => {
  before(done => {
    api
      .delete(`/api/movies/${movieToDelete._id}`)
      .set('Accept', 'application/json')
      .end(done);
  });
  it('should remove user from database and return it', done => {
    api
      .delete(`/api/user/${user._id}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body).to.eql(user);
        done();
      });
  });
});
