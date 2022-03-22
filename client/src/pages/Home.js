import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home({ user, seller }) {
     return (
          <div className="container">
               <h1>
                    Homegrown{" "}
                    <Link className="btn btn-primary me-3" to="/signup">
                         Create New Account
                    </Link>
                    <Link className="btn btn-primary" to="/login">
                         Log In
                    </Link>
               </h1>
               <h3></h3>

               <div className=""></div>
               <div>
                    <img
                         src="https://images.pexels.com/photos/4153232/pexels-photo-4153232.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                         alt="Girl Writing At Desk"
                         width="1050px"
                    ></img>
               </div>
          </div>
     );
}
export default Home;
