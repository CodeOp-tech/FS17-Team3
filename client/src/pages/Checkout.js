import React, {useEffect, useState} from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import ProductDisplay from '../components/ProductDisplay';
import './Checkout.css';

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

function Checkout( {user, increaseOrderCountCB} ) {
    const [message, setMessage] = useState("");
    
    const increaseOrderCountCO = (id, current) => {
        increaseOrderCountCB(id, current)
    }

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
        <ProductDisplay 
        user={user}/>
      );
    }

export default Checkout;


