import React, {useEffect, useState, useContext} from "react";
import {useParams, Link} from "react-router-dom";
import Api from '../../helpers/Api';
import './ProductDetail.css';
import CartContext from '../../CartContext';
import Loading from '../../components/Loading';

function ProductDetail() {
    const {productid} = useParams();
    const [highlightedProduct, setHighlightedProduct] = useState({});
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        getHighlighted();
      }, []);
    
      const getHighlighted = async () => {
          let response = await Api.getContent(`/products/${productid}`);
          if (response.ok) {
            setHighlightedProduct(response.data);
          }
          else {
            setErrorMsg("Uh oh! Something went wrong.")
          }
        };

        let { cart, addToCartCB, increaseOrderCountCB, decreaseOrderCountCB } = useContext(CartContext); 

        const handleAdd = (id, price) => {
            addToCartCB(id, price);
          }
    
        const handleIncrease = (id, current, price) => {
            increaseOrderCountCB(id, current, price);
        }
        
        const handleDecrease = (id, current, price) => {
            decreaseOrderCountCB(id, current, price);
        }

    return (
          <div className="container product-detail-page d-flex flex-column align-items-center">

                <div aria-label="breadcrumb" className="py-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/products/all">All Products</Link></li>
                        <li className="breadcrumb-item"><Link to={highlightedProduct.category === 'Clothing & Accessories' ? '/products/Clothing' : `/products/${highlightedProduct.category}`} >{highlightedProduct.category}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{highlightedProduct.name}</li>
                    </ol>
                </div>
               
               {
                   Object.keys(highlightedProduct).length > 0 
                   ?
                   <div className="d-flex px-3">
                   <img className="highlight-image" src={highlightedProduct.imgurl} />
                   <div className="highlight-text">
                        <div className="highlight-listedby">Listed by: <Link to={`/shop/${highlightedProduct.listedby}`} >{highlightedProduct.username}</Link></div>
                        <div className="highlight-name fs-2">{highlightedProduct.name}</div>
                        <div className="fs-3">€{(highlightedProduct.price/100).toFixed(2)}</div>
                        
                        {   
                            (cart.filter(cartitem => cartitem.productid === highlightedProduct.productid).length) > 0
                            ?
                            (
                                <div className="d-flex fs-5 mt-3 mb-3">
                                <button className="btn btn-add-to-cart fs-5 px-3" disabled>Product Added!</button>
                                <button className="btn btn-sm ms-2 btn-cart-left text-light" onClick={e => handleIncrease(highlightedProduct.productid, cart.filter(cartitem => cartitem.productid === highlightedProduct.productid)[0].quantity, highlightedProduct.price)}> + </button>
                                <div className="cart-quantity d-flex align-items-center justify-content-center">{cart.filter(cartitem => cartitem.productid === highlightedProduct.productid)[0].quantity}</div>
                                <button className="btn btn-sm btn-cart-right text-light" onClick={e => handleDecrease(highlightedProduct.productid, cart.filter(cartitem => cartitem.productid === highlightedProduct.productid)[0].quantity, highlightedProduct.price)}>-</button>
                                </div>
                            )
                            :
                            (<button className="btn btn-add-to-cart fs-5 px-3 mt-3 mb-3" onClick={e => handleAdd(highlightedProduct.productid, highlightedProduct.price)}>Add to Cart</button>)
                        }
                                            
                        <div className="highlight-description">{highlightedProduct.description}</div>
                        
                   
                   </div>
                   </div>
                   :
                   <Loading />

               }
               

          </div>
     );
}
export default ProductDetail;