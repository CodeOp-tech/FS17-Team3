import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/Api';
import CartContext from '../CartContext';
import './ProductDisplay.css';

const ProductDisplay = ({user}) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [cartTotal, setCartTotal] = useState("");

    let { cart, increaseOrderCountCB, decreaseOrderCountCB, deleteFromCartCB } = useContext(CartContext);

    useEffect(() => {
      if (cart.length > 0) {
        let total = cart.map(i=>i.price*i.quantity).reduce((a,b)=>a+b)
        setCartTotal(total);
      }
    }, [cart]);

    const handleIncrease = (id, current) => {
        increaseOrderCountCB(id, current);
    }
    
      const handleDecrease = (id, current) => {
        decreaseOrderCountCB(id, current);
    }

    const handleDelete = (productid) => {
        deleteFromCartCB(productid);
    }


    return (
    <section className="container w-50">
        {cart.map(cartitem => (
            <div 
            key={cartitem.productid}
            className="d-flex mb-3 bg-light p-3">
            
            <div className="d-flex justify-content-center img-container"><img className="img-fluid" src={cartitem.imgurl} /></div>
            <div className="text-dark d-flex">
                <div className="ms-3 d-flex flex-column align-items-start">
                <h5>{cartitem.name}</h5>
                <p className="text-start fs-6">{cartitem.description.substring(0,100)}...<Link to="/">View full description</Link></p>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                <div>€{cartitem.price*cartitem.quantity}.00</div>  
                <div className="d-flex align-items-center justify-content-center"><button className="btn btn-success btn-sm me-2" onClick={e => handleIncrease(cartitem.productid, cartitem.quantity)}> + </button><div className="me-2">{cartitem.quantity}</div><button className="btn btn-danger btn-sm" onClick={e => handleDecrease(cartitem.productid, cartitem.quantity)}>-</button></div>
                <button className="btn btn-danger mt-2"onClick={e => handleDelete(cartitem.productid)}>Delete</button></div>
            </div>

            </div>
        ))}

        <div className="border d-flex justify-content-end">TOTAL: €{cartTotal}.00</div>
        <button className="btn btn-primary">Checkout</button>
    </section>
    )
}

export default ProductDisplay