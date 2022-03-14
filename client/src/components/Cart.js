import React, {useEffect, useState} from 'react';

const Cart = () => {

    return (
    <section>
        <h2>Cart</h2>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
        />
        <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
        </div>
      </div>
      <form action="/create-checkout-session" method="POST">
        <button type="submit" className="btn btn-primary">
          Checkout
        </button>
      </form>
    </section>
  );

}

export default Cart;
