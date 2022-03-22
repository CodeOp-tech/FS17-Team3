import React, {useEffect, useState, useContext} from 'react';
import ProductDisplay from '../../components/ProductDisplay';

function Clothing(props) {
  return (
    <div className="container d-flex flex-column align-items-center">
        <h2>Clothing & Accessories</h2>
        <ProductDisplay category="Clothing & Accessories" />
    </div>
  );
}

export default Clothing;