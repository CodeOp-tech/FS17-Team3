import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
     return (
          <nav className="Navbar">
               <ul>
                    <li>
                         <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                         <NavLink to="/products">Products</NavLink>
                    </li>
                    <li>
                         <NavLink to="/checkout">Checkout</NavLink>
                    </li>
                    <li>
                         <NavLink to="/user/login">Log In</NavLink>
                    </li>
                    <li>
                         <NavLink to="/user/signup">User Sign Up</NavLink>
                    </li>
                    <li>
                         <NavLink to="/seller/login">Seller Log In</NavLink>
                    </li>
                    <li>
                         <NavLink to="/seller/signup">Seller Sign Up</NavLink>
                    </li>
               </ul>
          </nav>
     );
}
export default Navbar;
