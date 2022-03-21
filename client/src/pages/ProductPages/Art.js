import React, {useEffect, useState, useContext} from 'react';
import ProductDisplay from '../../components/ProductDisplay';

function Art(props) {
  return (
    <div className="container">
        <h2 className="page-content">Art</h2>
        <ProductDisplay category="Art" />
    </div>
  );
}

export default Art;