// require dependencies
const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
// set up our supertest to hit our local server later on
const api = supertest('http://localhost:8080');

//movie Tests needed
//get all movies
//get all movies by genre
//post movie
//get all ratings from movie
//post rating to movie
//get movie by id
//delete movie

//rating tests needed
//update rating by ID
//delete rating by ID

//User tests needed
//create new user
//post to login
//find movies created by user
//update user
//delete user
