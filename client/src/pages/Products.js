import React, {useEffect, useState, useContext} from 'react';
import Api from '../helpers/Api';
import ProductDisplay from '../components/ProductDisplay';

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

  return (
    <div className="container">
        <h2>Category Name</h2>
        <ProductDisplay products={products} />
    </div>
  );
}

export default Products;