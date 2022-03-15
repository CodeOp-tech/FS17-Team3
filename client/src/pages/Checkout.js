import React, {useEffect, useState} from 'react';

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  const ProductDisplay = ({cart}) => (
    <ul>
        {cart.map(cartitem => (
            <li>{cartitem.productid}</li>
        ))}
    </ul>
  )

function Checkout( {cart} ) {
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
    
        if (query.get("success")) {
          setMessage("Order placed! You will receive an email confirmation.");
        }
    
        if (query.get("canceled")) {
          setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }, []);

    return message ? (
        <Message message={message} />
      ) : (
        <ProductDisplay cart={cart} />
      );
    }

export default Checkout;


