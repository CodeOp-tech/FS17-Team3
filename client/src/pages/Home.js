import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home({ user, seller }) {
     return (
          <div className="container">
               <h1>Homegrown</h1>
               <div className="grid">
                    <img
                         className="image"
                         src="https://images.pexels.com/photos/5710033/pexels-photo-5710033.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                         alt="Knitting"
                         width="1000px"
                    ></img>
                    <div className="details">
                         <p>
                              Welcome to Homegrown homepage where you can source
                              homemade and handcrafted items directly from your
                              maker.
                         </p>
                         <Link className="" to="/products/all">
                              <button>Explore now</button>
                         </Link>
                    </div>
               </div>
               <h3>Top Products</h3>
               <div className="row">
                    <div class="col">
                         <img
                              className="col"
                              src="https://i.etsystatic.com/12397853/r/il/505fa0/2426681051/il_1588xN.2426681051_mocv.jpg"
                              width="200px"
                         ></img>
                    </div>

                    <div class="col">
                         <img
                              className="col"
                              src="https://i.etsystatic.com/20105212/r/il/99e7ee/3700655518/il_1588xN.3700655518_tpti.jpg"
                              width="200px"
                         ></img>
                    </div>
                    <div class="col">
                         <img
                              className="col"
                              src="https://i.etsystatic.com/12397853/r/il/505fa0/2426681051/il_1588xN.2426681051_mocv.jpg"
                              width="200px"
                         ></img>
                    </div>
               </div>
          </div>
     );
}
export default Home;
