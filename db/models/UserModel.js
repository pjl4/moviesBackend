const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	movies: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Movie'
	},
	ratedMovies: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Rating'
	}
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
