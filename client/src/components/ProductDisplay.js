import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/Api';
import CartContext from '../CartContext';
import './ProductDisplay.css';

const ProductDisplay = ({user}) => {
    const [errorMsg, setErrorMsg] = useState("");

    let { cart, increaseOrderCountCB, decreaseOrderCountCB, deleteFromCartCB } = useContext(CartContext);

    const cartTotal = cart.map(i=>i.price*i.quantity).reduce((a,b)=>a+b)

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
            
            <div className="d-flex justify-content-center container"><img className="img-fluid" src={cartitem.imgurl} /></div>
            <div className="text-dark d-flex">
                <div className="d-flex flex-column align-items-start">
                <h5>{cartitem.name}</h5>
                <p className="text-start fs-6">{cartitem.description.substring(0,200)}...<Link to="/">View full description</Link></p>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center"><button onClick={e => handleIncrease(cartitem.productid, cartitem.quantity)}> + </button>{cartitem.quantity} <button onClick={e => handleDecrease(cartitem.productid, cartitem.quantity)}>-</button></div>
                <button className="btn btn-danger mt-2"onClick={e => handleDelete(cartitem.productid)}>Delete</button></div>
            </div>

            </div>
        ))}

        <div>TOTAL: {cartTotal}</div>
        <button>Checkout</button>
    </section>
    )
}

export default ProductDisplay