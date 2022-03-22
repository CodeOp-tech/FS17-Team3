import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import Api from '../../helpers/Api';
import './ProductDetail.css';

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


    return (
          <div className="container product-detail-page d-flex flex-column align-items-center">

                <div aria-label="breadcrumb" className="py-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/products/all">All Products</Link></li>
                        <li className="breadcrumb-item"><Link to={`/products/${highlightedProduct.category}`} >{highlightedProduct.category}</Link></li>
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
                        <div><button className="btn btn-add-to-cart fs-5 px-3 mt-3 mb-3">Add to Cart</button></div>
                        <div className="highlight-description">{highlightedProduct.description}</div>
                        
                   
                   </div>
                   </div>
                   :
                   <div>Product not loaded yet</div>

               }
               

          </div>
     );
}
export default ProductDetail;