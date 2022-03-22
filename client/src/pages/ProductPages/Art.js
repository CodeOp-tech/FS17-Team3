import React, {useEffect, useState, useContext} from 'react';
import ProductDisplay from '../../components/ProductDisplay';

function Art(props) {
  return (
    <div className="container d-flex flex-column align-items-center">
        <h2>Art</h2>
        <ProductDisplay category="Art" />
    </div>
  );
}

export default Art;