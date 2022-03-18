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

router.get("/order/:orderid", async (req, res) => {
    let id = req.params.orderid;
    let sqlCheckID = `SELECT * from orders WHERE orderid = ${id}`;
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

  // Get order(s) by user ID

router.get("/user/:userid", async (req, res) => {
    let userid = req.params.userid;
    let sqlGetOrders = `select * from orders WHERE userid = ${userid}`;
    try {
      let result = await db(sqlGetOrders);
      if (result.data.length === 0) {
        res.status(404).send({ error: "This user has no orders!" });
      } else {
        let userOrders = result.data;
        for (let i in userOrders) {
            let orderid = userOrders[i].orderid;
            let orderItems = await db(`SELECT * from orderitems WHERE orderid = ${orderid}`);
            userOrders[i].orderItems = orderItems.data;
        }
        res.send(userOrders);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Add new order

router.post("/create", async (req, res) => {
    let { userid } = req.body;
      try {
        let sqlCreateOrder = `insert into orders (userid) values (${userid})`;
        await db(sqlCreateOrder);
        let result = await db(`SELECT * from orders ORDER BY orderid DESC`);
        let orderid = result.data[0].orderid;
        let sqlUpdateCart = `UPDATE cart SET orderid = ${orderid} WHERE userid = ${userid}`;
        await db(sqlUpdateCart);
        let sqlCreateOrderItems = `insert into OrderItems (orderid, orderprice, orderquantity, productid) select orderid, price, quantity, productid from cart where userid = ${userid}`
        await db(sqlCreateOrderItems);
        let sqlEmptyCart = `DELETE FROM cart WHERE userid = ${userid}`;
        await db(sqlEmptyCart);
        // let sqlGetOrders = `SELECT * from orders`;
        // let orderResult = await db(sqlGetOrders);
        // let orders = orderResult.data;
        res.status(201).send({message: 'Order created successfully!'});
    } 
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

module.exports = router;