import React, {useEffect, useState} from 'react';
import Api from '../helpers/Api';

function Products(props) {
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
      let response = await Api.getContent('/products');
      if (response.ok) {
        setProducts(response.data);
        console.log(products);
      }
      else {
        setErrorMsg("Uh oh! Something went wrong.")
      }
    };

  const addToCart = async (id) => {
    if (props.user) {
      let newCartObj = {
        userid: props.user.userid,
        productid: id
      }
      console.log(newCartObj);
      let response = await Api.addContent('/cart', newCartObj);
      if (response.ok) {
        console.log("Product added to cart!")
      }
      else {
        setErrorMsg(response.error)
      }
    }
  }

  return (
    <div className="container">
        <h2>List of products</h2>
        <ul>
          {products.map(p => (
            <li key={p.productid}>
            <span className="me-2">{p.name}</span> 
            <button className="btn btn-primary" onClick={e => addToCart(p.productid)}>Add to cart</button>
            </li>
          ))}
          
        </ul>
    </div>
  );
}

export default Products;