var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET all products */
router.get('/', function(req, res, next) {
    db(`SELECT p.*, s.username 
        FROM products as p
        JOIN sellers AS s ON p.listedby = s.sellerid`)
      .then(results => {
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  });


// Get product by ID

router.get("/:productid", async (req, res) => {
    let id = req.params.productid;
    let sqlCheckID = `SELECT * from products WHERE productid = ${id}`;
    try {
      let result = await db(sqlCheckID);
      if (result.data.length === 0) {
        res.status(404).send({ error: "Product not found!" });
      } else {
        res.send(result.data[0]);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Add new product

router.post("/", async (req, res) => {
    let { name, description, imgurl, category, price, listedby } = req.body;
    let sql = `insert into products (name, description, imgurl, category, price, listedby) 
              values ('${name}', '${description}', '${imgurl}', '${category}', ${price}, ${listedby})`;
      try {
      await db(sql);
      let result = await db(`SELECT p.*, s.username 
      FROM products as p
      JOIN sellers AS s ON p.listedby = s.sellerid`);
      let products = result.data;
      res.status(201).send(products);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Edit product

router.put("/:productid", async (req, res) => {
    let id = req.params.productid;
    let { name, description, imgurl, category, price, listedby } = req.body;
    let sqlCheckID = `SELECT * from products WHERE productid = ${id}`;
    let sqlUpdate = `
    UPDATE products SET 
    name = '${name}',    
    description = '${description}',
    imgurl = '${imgurl}', 
    category = '${category}',
    price = ${price},
    listedby = ${listedby}
    WHERE productid = ${id};
    `;
    try {
      let result = await db(sqlCheckID);
      if (result.data.length === 0) {
        res.status(404).send({ error: "Product not found!" });
      } else {
        await db(sqlUpdate);
        let result = await db(`SELECT p.*, s.username 
        FROM products as p
        JOIN sellers AS s ON p.listedby = s.sellerid`)
        let products = result.data;
        res.status(201).send(products);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Delete product

router.delete("/:productid", async (req, res) => {
    let id = req.params.productid;
    let sqlCheckID = `SELECT * FROM products WHERE productid = ${id}`;
    let sqlDelete = `DELETE FROM products WHERE productid = ${id}`;
    try {
      let result = await db(sqlCheckID);
      if (result.data.length === 0) {
        res.status(404).send({ error: "Product not found!" });
      } else {
        await db(sqlDelete);
        let result = await db(`SELECT p.*, s.username 
        FROM products as p
        JOIN sellers AS s ON p.listedby = s.sellerid`);
        let products = result.data;
        res.status(201).send(products);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

module.exports = router;