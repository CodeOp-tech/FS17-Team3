import React, {useContext, useEffect, useState} from "react";
import CartContext from '../CartContext';
import Api from '../helpers/Api';
import './ProductDisplay.css';

function ProductDisplay({category}) {
    const [products, setProducts] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);

    useEffect(() => {
        getProducts();
      }, []);
    
      const getProducts = async () => {
          let response = await Api.getContent('/products');
          if (response.ok) {
            let productData = response.data;
            if (category === "All") {
              setProducts(productData);
            }
            else {
              setProducts(productData.filter(product => product.category === category));
            }
            
          }
          else {
            setErrorMsg("Uh oh! Something went wrong.")
          }
        };
    
    let { cart, addToCartCB, increaseOrderCountCB, decreaseOrderCountCB, deleteFromCartCB } = useContext(CartContext); 
    
    const handleAdd = (id, price) => {
        addToCartCB(id, price);
        console.log(cart);
      }

    const handleIncrease = (id, current, price) => {
        increaseOrderCountCB(id, current, price);
    }
    
    const handleDecrease = (id, current, price) => {
        decreaseOrderCountCB(id, current, price);
    }

    return (
        <div>

        <div className="ProductCards">
        <div className="row">
            {products.map(p => (
                <div key={p.productid} className="col-sm-6 col-md-6 col-lg-4">
                <div className="card card">
                <img src={p.imgurl} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <span className="badge badge-pill badge-light">€{(p.price/100).toFixed(2)}</span>
                <br></br>

                {   
                    (cart.filter(cartitem => cartitem.productid === p.productid).length) > 0
                    ?
                    (
                        <div>
                        <button className="btn btn-primary btn-products" disabled>Add</button>
                        {/* <button className="btn btn-success btn-sm me-2" onClick={e => handleIncrease(cartitem.productid, cartitem.quantity, cartitem.price)}> + </button>
                        <div className="me-2">{cartitem.quantity}</div>
                        <button className="btn btn-danger btn-sm" onClick={e => handleDecrease(cartitem.productid, cartitem.quantity, cartitem.price)}>-</button> */}
                        </div>
                    )
                    :
                    (<button className="btn btn-primary btn-products" onClick={e => handleAdd(p.productid, p.price)}>Add</button>)
                }
                
                
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