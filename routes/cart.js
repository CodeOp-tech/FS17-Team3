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

// Edit cart

router.patch("/:userid", async (req, res) => {
    let {userid} = req.params;
    let { productid, quantity } = req.body;
    let sql = `UPDATE cart SET quantity = ${quantity} WHERE userid = ${userid} AND productid = ${productid}`;
      try {
      await db(sql);
      let result = await db(`SELECT c.*, p.* FROM cart AS c JOIN products AS p ON c.productid = p.productid WHERE userid = ${userid}`);
      let cart = result.data;
      res.status(201).send(cart);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // Delete item from cart

router.delete("/:userid/:productid", async (req, res) => {
    let {userid, productid} = req.params;
    let sqlCheckID = `SELECT * FROM cart WHERE userid = ${userid} AND productid = ${productid}`;
    let sqlDelete = `DELETE FROM cart WHERE userid = ${userid} AND productid = ${productid}`;
    let sqlGetCart = `SELECT c.*, p.* FROM cart AS c JOIN products AS p ON c.productid = p.productid WHERE userid = ${userid}`;
    try {
      let result = await db(sqlCheckID);
      if (result.data.length === 0) {
          res.status(404).send({ error: "Product is not in cart!" });
        }    
      else {
            await db(sqlDelete);
            let result = await db(sqlGetCart);
            let cart = result.data;
            res.status(201).send(cart);
          }  
        }
    catch (err) {
          next(err);
      }
  });

// Get cart of logged-in user

router.get('/:userid', async function(req, res, next) {
  let {userid} = req.params;
  let sql = `SELECT c.*, p.* FROM cart AS c JOIN products AS p ON c.productid = p.productid WHERE userid = ${userid} AND completed = 0`;
  try {
    let results = await db(sql);
    let cart = results.data;
    res.send(cart);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

// Mark all cart items as purchased

router.patch('/:userid/empty', async function(req, res, next) {
  let {userid} = req.params;
  let sqlEmpty = `UPDATE cart SET completed = 1 WHERE userid = ${userid}`;
  let sql = `SELECT c.*, p.* FROM cart AS c JOIN products AS p ON c.productid = p.productid WHERE userid = ${userid} AND completed = 0`;
  try {
    await db(sqlEmpty);
    let results = await db(sql);
    let cart = results.data;
    res.send(cart);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

// Get order history of logged-in user

router.get('/:userid/history', async function(req, res, next) {
  let {userid} = req.params;
  let sql = `SELECT c.*, p.* FROM cart AS c JOIN products AS p ON c.productid = p.productid WHERE userid = ${userid} AND completed = 1`;
  try {
    let results = await db(sql);
    let history = results.data;
    res.send(history);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

module.exports = router;