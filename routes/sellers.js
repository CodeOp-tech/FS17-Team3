var express = require('express');
var router = express.Router();
const {ensureSameSeller} = require('../middleware/guards');
const {makePatchSQL} = require('../middleware/helper');
const db = require("../model/helper");

/* GET sellers listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET one seller
router.get('/:sellerid', async function(req, res, next) {
  let {sellerid} = req.params;
  let sql = 'SELECT * FROM sellers WHERE sellerid = ' + sellerid;

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
router.patch('/:sellerid', ensureSameSeller, async (req, res) => {
  let { sellerid } = req.params;
  let sql = makePatchSQL(req.body, sellerid);
  try {
      let result = await db(sql);
      // ...
        let seller = result.data[0];
        res.send(seller);
  } catch (err) {
    res.status(500).send({error: err.messsage})
  }
});


// GET all products where listedby = sellerid

// router.get("/", function(req, res, next) {
//   // console.log(req.query);
//   let { productid } = req.query;
//   if (productid) {
//     db(`SELECT * FROM products 
//     WHERE listedby = '${sellerid}';`)
//     .then(results => {
//       console.log(results);
//       res.send(results.data);
//     })
//     .catch(err => res.status(500).send(err));
//   } else {
//     db("SELECT * FROM products;")
//     .then(results => {
//       res.send(results.data);
//     })
//     .catch(err => res.status(500).send(err));
//   }
// });


module.exports = router;