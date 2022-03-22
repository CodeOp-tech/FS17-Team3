import React, {useEffect, useState, useContext} from 'react';
import ProductDisplay from '../../components/ProductDisplay';

function Jewellry(props) {
  return (
    <div className="container d-flex flex-column align-items-center">
        <h2>Jewellry</h2>
        <ProductDisplay category="Jewellry" />
    </div>
  );
}

export default Jewellry;