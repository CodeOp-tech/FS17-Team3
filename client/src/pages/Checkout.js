import React, {useEffect, useState, useContext} from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import ProductDisplay from '../components/ProductDisplay';
import CartContext from '../CartContext';

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

function Checkout( {user, increaseOrderCountCB} ) {
    const [message, setMessage] = useState("");

    let { cart, createOrderCB } = useContext(CartContext);
    
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
    
        if (query.get("success")) {
          setMessage("Order placed! You will receive an email confirmation.");
          processOrder();
        }
    
        if (query.get("canceled")) {
          setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }, []);

    const processOrder = () => {
      createOrderCB()
    }


    return message ? (
        <Message message={message} />
      ) : 
        <ProductDisplay user={user}/>
    }

export default Checkout;


