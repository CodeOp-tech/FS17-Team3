import React from "react";
import { useState, useEffect } from "react";
import Api from "../helpers/Api";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
     const [products, setProducts] = useState([]);
     const [errorMsg, setErrorMsg] = useState([]);

     useEffect(() => {
          getProducts();
     }, []);

     const getProducts = async () => {
          let response = await Api.getContent("/products");
          if (response.ok) {
               let productData = response.data;
               setProducts(productData.filter((product, index) => index <= 2));
          } else {
               setErrorMsg("Uh oh! Something went wrong.");
          }
     };

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
               <div className="ProductCards">
                    <div className="row">
                         {products.map((p) => (
                              <div
                                   key={p.productid}
                                   className="col-sm-6 col-md-6 col-lg-4"
                              >
                                   <div className="card">
                                        <Link to={`/products/${p.productid}`}>
                                             <img
                                                  src={p.imgurl}
                                                  className="card-img-top"
                                                  alt="..."
                                             />
                                        </Link>

                                        <div className="card-body">
                                             <h5 className="card-title">
                                                  {p.name}
                                             </h5>
                                             <span className="prod-price badge badge-pill badge-light">
                                                  €{(p.price / 100).toFixed(2)}
                                             </span>
                                        </div>
                                   </div>
                              </div>
                         ))}
                         ;
                    </div>
               </div>
          </div>
     );
}
export default Home;
