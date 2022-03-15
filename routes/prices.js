var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const { STRIPE_SECRET_KEY } = require('../config');
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// Get all stripe prices
router.get("/", async (req, res) => {
    try {
      let result = await stripe.prices.list({
        limit: 100,
      });
      if (!result) {
        res.status(404).send({ error: "No prices found!" });
      } else {
        res.send(result.data);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Get stripe product by ID


// Add stripe product

router.post("/stripe", async (req, res) => {
    let productid = req.params.productid;
    let { name, description, img1, category, price, listedby } = req.body;
    try {
        await stripe.products.create(
            {
                name: name,
                description: description,
                images: [img1],
                metadata: {
                    listedby: listedby,
                    category: category,
                    price: price
                }
            });
        let result = await stripe.products.list({
            limit: 100,
          });
        let products = result.data;
        res.status(201).send(products);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Edit stripe product

router.post("/stripe/:productid", async (req, res) => {
    let productid = req.params.productid;
    let { name, description, img1, category, price, listedby } = req.body;
    try {
        await stripe.products.update(
            productid,
            {
                name: name,
                description: description,
                images: [img1],
                metadata: {
                    listedby: listedby,
                    category: category,
                    price: price
                }
            }
          );
        let result = await stripe.products.list({
            limit: 100,
          });
        let products = result.data;
        res.status(201).send(products);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// Delete stripe product

router.delete("/stripe/:productid", async (req, res) => {
    let productid = req.params.productid;
    try {
        await stripe.products.del(productid);
        let result = await stripe.products.list({
            limit: 100,
        });
        let products = result.data;
        res.status(201).send(products);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

module.exports = router;