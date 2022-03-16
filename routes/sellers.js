var express = require('express');
var router = express.Router();
const {ensureSameSeller} = require('../middleware/guards');
const {makePatchSQL} = require('../middleware/helper');
const db = require("../model/helper");

/* GET sellers listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET one seller. (add ensureSameSeller function when working)
router.get('/:sellerId', async function(req, res, next) {
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

// Update Seller Shop Info with PATCH (add ensureSameSeller function when working)
router.patch('/:sellerId', async (req, res) => {
  let { sellerId } = req.params;
  let sql = makePatchSQL(req.body, sellerId);
  try {
      let result = await db(sql);
      // ...
        let seller = result.data[0];
        res.send(seller);
  } catch (err) {
    res.status(500).send({error: err.messsage})
  }
});


module.exports = router;