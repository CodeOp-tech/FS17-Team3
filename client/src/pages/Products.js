import React, {useEffect, useState} from 'react';
import Api from '../helpers/Api';


function Products() {
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
      let response = await Api.getContent('/products/stripe');
      if (response.ok) {
        setProducts(response.data);
        console.log(products);
      }
      else {
        setErrorMsg("Uh oh! Something went wrong.")
      }
    };

  return (
    <div className="container">
        
        <h2>List of products</h2>
        <ul>
          {products.map(p => (
            <li>
            <span className="me-2">{p.name}</span> 
            <button className="btn btn-primary">Add to cart</button>
            </li>
          ))}
          
        </ul>

    </div>
  );
}

export default Products;