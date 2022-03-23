import React from "react";
import { Link } from "react-router-dom";

function SellerOrders({ user, seller }) {
     let {sellerid} = useParams();

     return (
          <div className="container">
               
               Seller's Orders

          </div>
     );
}
export default SellerOrders;