import React, {useContext, useEffect, useState} from "react";
import CartContext from '../CartContext';



function ProductDisplay({products}) {
    let { addToCartCB } = useContext(CartContext); 
    
    const handleAdd = (id, price) => {
        addToCartCB(id, price);
      }

    return (
          <div className="container">
                <ul>
                    {products.map(p => (
                        <li key={p.productid}>
                        <span className="me-2">{p.name}</span> 
                        <button className="btn btn-primary" onClick={e => handleAdd(p.productid, p.price)}>Add to cart</button>
                        </li>
                    ))}      
                </ul>
          </div>
     );
}
export default ProductDisplay;