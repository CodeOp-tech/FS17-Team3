var express = require('express');
var router = express.Router();
const {ensureSameUser} = require('../middleware/guards');
const db = require("../model/helper");

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

// GET one user

router.get('/users/:userId', ensureSameUser, async function(req, res, next) {
  let {userId} = req.params;
  let sql = 'SELECT * FROM users WHERE userid = ' + userId;

  try {
    let results = await db(sql);
    let user = results.data[0];
    delete user.password;
    res.send(user);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

module.exports = router;
