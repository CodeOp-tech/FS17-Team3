var express = require('express');
var router = express.Router();
const {ensureSameSeller} = require('../middleware/guards');
const {makePatchSQL} = require('../middleware/helper');
const db = require("../model/helper");
const fs = require('fs/promises');
var path = require('path');

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

/* Patch profile image

const mime = require("mime-types");
const { imagefile } = req.files;
const extension = mime.extension(imagefile.mimetype);
const filename1 = filename1 + "." + extension;

- Create a folder in public called images/sellers.
- Store just the filename in the DB and store the image in the folder above
- In the GET /sellers/:id route, after fetching the record from the DB, prepend the filename in profilepic with something like http://localhost:5000/images/sellers so it’s a proper URL that the client can use*/

router.patch('/profile/:sellerid', ensureSameSeller, async function (req, res) {
  let { sellerid } = req.params.sellerid;
  console.log("req.files:", req.files)
  // ^ shows roses.jpeg but problem with myfile.temp. Changeto req.file and myfile error fixed but req.file undfined 400 no file
  if(!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send({error: 'No file'})
    return;
  }
  let { myfile } = req.files;
  let fromPath = myfile.tempFilePath;
  let toPath = path.join(__dirname, '../public/images/sellers/') + myfile.name;
  try {
    await fs.rename(fromPath, toPath);
    let sql = `
    INSERT INTO sellers (picurl)
    VALUES ('${myfile.name}')
    WHERE sellerid = ${sellerid}
    `;
    await db(sql)
    res.status(201).send('Profile photo successfully updated!');
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

// let result = await db(sql);
//     let seller = result.data[0];
//     res.status(201).send(seller);


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