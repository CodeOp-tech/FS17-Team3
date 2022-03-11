var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');  // add at the top
const stripe = require('stripe')('sk_test_51JWei7KmdPIQ5CnWPHY28Xe0xkUWNABZ8U04iFNimYCZNvG9GCVuhgR1RRWMrr3jOo0HN77qiyehrgOTTl4U45oy009XmCpFbc');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var authUsersRouter = require('./routes/authUsers');

var app = express();

app.use(cors());  // add after 'app' is created
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/', authUsersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// General error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({ error: err.message });
});


// Code for Stripe checkout

app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000/checkout';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: 'customer@example.com',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['ES', 'FR', 'PT'],
    },
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1Kc6qeKmdPIQ5CnWjgBaHCAt',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));

module.exports = app;