import React, {useEffect, useState, useContext} from 'react';
import ProductDisplay from '../../components/ProductDisplay';

function Clothing(props) {
  return (
    <div className="container">
        <h2>Clothing & Accessories</h2>
        <ProductDisplay category="Clothing" />
    </div>
  );
}

export default Clothing;