import React, {useEffect, useState, useContext} from 'react';
import ProductDisplay from '../../components/ProductDisplay';

function AllProducts(props) {
  return (
    <div className="container d-flex flex-column align-items-center">
        <h2>All Products</h2>
        <ProductDisplay category="All" />
    </div>
  );
}

export default AllProducts;