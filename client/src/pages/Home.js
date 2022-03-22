import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Home() {
     return (
          <div className="container">
               <h1>Homegrown</h1>
               <div className="">
                    <h2>
                         <Link className="btn btn-primary me-3" to="/signup">
                              Create New Account
                         </Link>
                         <Link className="btn btn-primary" to="/login">
                              Log In
                         </Link>
                    </h2>
                    <body>
                         <img
                              src="https://images.pexels.com/photos/4153232/pexels-photo-4153232.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                              alt="Girl Writing At Desk"
                         ></img>
                    </body>
               </div>
          </div>
     );
}
export default Home;
