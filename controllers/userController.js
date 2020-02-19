const express = require('express');
const router = express.Router();
const User = require('../db/models/UserModel');
const Movie = require('../db/models/MovieModel');
const bcrypt = require('bcryptjs');
router.post('/', (req, res) => {
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			res.json({
				error: 'Email in use'
			});
		} else {
			User.findOne({ userName: req.body.userName }).then((user) => {
				if (user) {
					res.json({
						error: 'Username in use'
					});
				} else {
					req.body.password = bcrypt.hashSync(req.body.password, 10);
					User.create(req.body)
						.then((user) => res.json(user))
						.catch(console.error);
				}
			});
		}
	});
});

router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.json(user);
			} else {
				res.json({
					error: 'Email or password was incorrect'
				});
			}
		} else {
			res.json({
				error: 'Email or password was incorrect'
			});
		}
	});
});
router.get('/:id', (req, res) => {
	User.findById(req.params.id).then((user) => {
		Movie.find({ createdBy: user._id })
			.then((movies) => {
				const newMovieObj = {
					user: {
						userName: user.userName
					},
					movies
				};
				res.json(newMovieObj);
			})
			.catch(console.error);
	});
});
router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body)
		.then((user) => res.json(user))
		.catch(console.error);
});
router.delete('/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then((user) => res.json(user))
		.catch(console.error);
});

module.exports = router;
