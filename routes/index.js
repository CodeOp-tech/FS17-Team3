const express = require('express');
const router = express.Router();
const {ensureUserLoggedIn} = require('../middleware/guards');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

// GET /users-only content

router.get('/users-only', ensureUserLoggedIn, function(req, res) {
  res.send({message: 'Here is your users-only content'});
});

module.exports = router;
