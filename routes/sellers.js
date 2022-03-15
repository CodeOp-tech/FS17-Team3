var express = require('express');
var router = express.Router();
const {ensureSameSeller} = require('../middleware/guards');
const db = require("../model/helper");

/* GET sellers listing. */
router.get('/sellers', function(req, res, next) {
  res.send('respond with a resource');
});

// GET one seller

router.get('/sellers/:sellerId', ensureSameSeller, async function(req, res, next) {
  let {sellerId} = req.params;
  let sql = 'SELECT * FROM sellers WHERE sellerid = ' + sellerId;

  try {
    let results = await db(sql);
    let seller = results.data[0];
    delete seller.password;
    res.send(seller);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
}); 

// Update Seller Shop Info with PATCH

module.exports = router;