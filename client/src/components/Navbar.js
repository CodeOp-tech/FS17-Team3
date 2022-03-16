import React from "react";
import "../App.css";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
     return (
          <>
               <div className="navbar"></div>
               <Link to="#" className="menu-bars">
                    <FaIcons.FaBars />
               </Link>
          </>
     );
}
export default Navbar;
