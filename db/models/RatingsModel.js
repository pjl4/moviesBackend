const mongoose = require('mongoose');

const RatingsSchema = new mongoose.Schema({
	rating: {
		type: Number,
		max: 10,
		min: 0,
		required: true
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});
const Rating = mongoose.model('Rating', RatingsSchema);

module.exports = Rating;
