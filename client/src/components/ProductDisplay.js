import React, {useContext, useEffect, useState} from "react";
import CartContext from '../CartContext';
import './ProductDisplay.css';



function ProductDisplay({products}) {
    let { addToCartCB } = useContext(CartContext); 
    
    const handleAdd = (id, price) => {
        addToCartCB(id, price);
      }

    return (
        <div>


          {/* <div className="container">
                <ul>
                    {products.map(p => (
                        <li key={p.productid}>
                        <span className="me-2">{p.name}</span> 
                        <button className="btn btn-primary" onClick={e => handleAdd(p.productid, p.price)}>Add to cart</button>
                        </li>
                    ))}      
                </ul>
          </div> */}

        <div className="ProductCards">
        <div className="row">
            {products.map(p => (
                <div className="col-sm-6 col-md-6 col-lg-4">
                <div key={p.productid} class="card card">
                <img src={p.imgurl} class="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <span class="badge badge-pill badge-light">£{p.price}</span>
                <br></br>
                <button className="btn btn-primary btn-products" onClick={e => handleAdd(p.productid, p.price)}>Add</button>
                </div>
                </div>
                </div>
             ))}
        </div>
        </div> 


</div>
     );
}
export default ProductDisplay;