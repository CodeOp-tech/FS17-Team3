var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');  // add at the top
const { STRIPE_SECRET_KEY } = require('./config');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const db = require('./model/helper');
// const fileUpload = require('express-fileupload');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sellersRouter = require('./routes/sellers');
var productsRouter = require('./routes/products');
var authUsersRouter = require('./routes/authUsers');
var authSellersRouter = require('./routes/authSellers');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/orders');
var orderItemsRouter = require ('./routes/orderitems');

var app = express();

app.use(cors());  // add after 'app' is created
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: '/tmp/'
//   })
// );

app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sellers', sellersRouter);
app.use('/products', productsRouter);
app.use('/', authUsersRouter);
app.use('/', authSellersRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/orderitems', orderItemsRouter);


// Code for Stripe checkout

app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000/cart';

app.post('/create-checkout-session', async (req, res) => {
  try {
    let {userid} = req.body;
    let cart = await db(`SELECT c.quantity, p.stripe_priceid AS price FROM cart AS c JOIN products AS p ON c.productid = p.productid WHERE userid = ${userid}`);
    let line_items = cart.data;
    console.log(line_items);
    if (line_items.length === 0) {
      res.status(404).send({ error: "Cart not found!" });
    } else {
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });
      res.redirect(303, session.url);
    } 
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// General error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({ error: err.message });
});

module.exports = app;