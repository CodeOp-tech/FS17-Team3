import React, {useEffect, useState, useContext} from 'react';
import ProductDisplay from '../../components/ProductDisplay';

function Homewares() {
  return (
    <div className="container">
        <h2>Homewares</h2>
        <ProductDisplay category="Homewares" />
    </div>
  );
}

export default Homewares;