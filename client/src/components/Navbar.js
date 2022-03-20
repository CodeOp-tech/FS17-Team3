import React from 'react';
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
     return (
     <nav className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="/">Homegrown</a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>

     <div className="collapse navbar-collapse" id="navbarNav">
     <ul className="navbar-nav">
                    <li className="nav-link">
                         <NavLink to="/products">Products</NavLink>
                    </li>
                    <li className="nav-link">
                         <NavLink to="/checkout">Checkout</NavLink>
                    </li>
                    <li className="nav-link">
                         <NavLink to="/user/login">Log In</NavLink>
                    </li>
                    <li className="nav-link">
                         <NavLink to="/seller/login">Seller Log In</NavLink>
                    </li>

                         <div class="dropdown">
                         <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Sign Up
                         </button>
                         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                         <a class="dropdown-item" href="/user/signup">User</a>
                         <a class="dropdown-item" href="/seller/signup">Seller</a>
                         </div>
</div>
    </ul>
  </div>
</nav>
     );
}

export default Navbar;

{/* <nav className="Navbar">
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
          </nav> */}
