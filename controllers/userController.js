const express = require('express');
const router = express.Router();
const User = require('../db/models/UserModel');

router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(console.error);
});
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(console.error);
});
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(console.error);
});
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json(user))
    .catch(console.error);
});

module.exports = router;
