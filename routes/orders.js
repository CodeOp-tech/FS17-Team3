var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET all orders */
router.get('/', function(req, res, next) {
    db(`SELECT * from orders`)
      .then(results => {
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  });


// Get order by ID

router.get("/:orderid", async (req, res) => {
    let id = req.params.orderid;
    let sqlCheckID = `SELECT * from products WHERE orderid = ${id}`;
    try {
      let result = await db(sqlCheckID);
      if (result.data.length === 0) {
        res.status(404).send({ error: "Order not found!" });
      } else {
        res.send(result.data[0]);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Add new order

router.post("/", async (req, res) => {
    let { userid } = req.body;
      try {
        let sql = `insert into orders (userid) values (${userid})`;
        await db(sql);
        let result = await db(`SELECT * from orders`);
        let orders = result.data;
        res.status(201).send(orders);
    } 
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

module.exports = router;