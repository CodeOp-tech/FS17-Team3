var express = require('express');
var router = express.Router();
const {ensureSameUser} = require('../middleware/guards');
const db = require("../model/helper");

// Add to cart

router.post("/", async (req, res) => {
    let { userid, productid } = req.body;
    let sql = `insert into cart (userid, productid, completed, quantity) 
              values (${userid}, ${productid}, 0, 1)`;
      try {
      await db(sql);
      let result = await db(`SELECT * from cart`);
      let cart = result.data;
      res.status(201).send(cart);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Get cart of logged-in user

router.get('/:userId', async function(req, res, next) {
  let {userId} = req.params;
  let sql = `SELECT * FROM cart WHERE userid = ${userId}`;
  try {
    let results = await db(sql);
    let cart = results.data;
    res.send(cart);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

module.exports = router;