import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Local from "./helpers/Local";
import Api from "./helpers/Api";
import CartContext from "./CartContext";

// Import pages
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import SellerLogin from "./pages/SellerLogin";
import UserSignUp from "./pages/UserSignUp";
import SellerSignUp from "./pages/SellerSignUp";
import ErrorPage from "./pages/ErrorPage";
import Products from "./pages/Products";
import TestPrivateUsers from "./pages/TestPrivateUsers";
import TestPrivateSellers from "./pages/TestPrivateSellers";
import PrivateRouteUsers from "./components/PrivateRouteUsers";
import PrivateRouteSellers from "./components/PrivateRouteSellers";
import UpdateShopDetails from "./pages/UpdateShopDetails";
import Shopfront from "./pages/Shopfront";
import Navbar from "./components/Navbar";
import UserSettings from "./pages/UserSettings";

function App() {
     const [user, setUser] = useState(Local.getUser());
     const [seller, setSeller] = useState(Local.getSeller());
     const [cart, setCart] = useState([]);
     const [loginError, setLoginError] = useState("");
     const [errorMsg, setErrorMsg] = useState("");
     const navigate = useNavigate();
     // const history = useHistory();

     useEffect(() => {
          getCart();
     }, []);

     const getCart = async () => {
          if (user) {
               let userid = user.userid;
               let response = await Api.getContent(`/cart/${userid}`);
               if (response.ok) {
                    setCart(response.data);
               } else {
                    setErrorMsg(response.error);
               }
          }
     };

     async function handleUserLogin(username, password) {
          let response = await Api.loginUser(username, password);
          console.log(response);
          if (response.ok) {
               Local.saveUserInfo(response.data.token, response.data.user);
               setUser(response.data.user);
               setLoginError("");
               navigate("/");
          } else {
               setLoginError(response.error);
               console.log(loginError);
          }
     }

     async function handleSellerLogin(username, password) {
          let response = await Api.loginSeller(username, password);
          console.log(response);
          if (response.ok) {
               Local.saveSellerInfo(response.data.token, response.data.seller);
               setSeller(response.data.seller);
               setLoginError("");
               navigate("/");
          } else {
               setLoginError(response.error);
               console.log(loginError);
          }
     }

     async function handleUserLogout() {
          Local.removeUserInfo();
          setUser(Local.getUser());
     }

     async function handleSellerLogout() {
          Local.removeSellerInfo();
          setSeller(Local.getSeller());
     }

     const handleUserSignUp = async (newUser) => {
          let response = await Api.userSignUp(
               newUser.username,
               newUser.password,
               newUser.email
          );
          if (response.ok) {
               setLoginError("");
               console.log("Sign up successful!");
          } else {
               setLoginError(response.error);
               console.log(loginError);
          }
     };

     const handleSellerSignUp = async (newSeller) => {
          let response = await Api.sellerSignUp(
               newSeller.username,
               newSeller.password,
               newSeller.email
          );
          if (response.ok) {
               setLoginError("");
               console.log("Sign up successful!");
          } else {
               setLoginError(response.error);
               console.log(loginError);
          }
     };

     // Change user info

     async function updateUserData(userObj, route) {
          let response = await Api.updateUserData(userObj, route);
          console.log(response);
          if (response.ok) {
               Local.saveUserInfo(response.data.token, response.data.user);
               setUser(response.data.user);
               setLoginError("");
          } else {
               setLoginError("Login failed");
               console.log(loginError);
          }
     }

     async function updateSellerData(sellerObj, route) {
          let response = await Api.updateSellerData(sellerObj, route);
          console.log(response);
          if (response.ok) {
               Local.saveSellerInfo(response.data.token, response.data.seller);
               setSeller(response.data.seller);
               setLoginError("");
          } else {
               setLoginError("Login failed");
               console.log(loginError);
          }
     }

     // CART FUNCTIONS
     const increaseOrderCount = async (id, current) => {
          let patched = {
               productid: id,
               quantity: current + 1,
          };
          let response = await Api.patchContent(
               `/cart/${user.userid}`,
               patched
          );
          if (response.ok) {
               setCart(response.data);
          } else {
               setErrorMsg(response.error);
          }
     };

     const decreaseOrderCount = async (id, current) => {
          if (current === 1) {
               deleteFromCart(id);
          } else {
               let patched = {
                    productid: id,
                    quantity: current - 1,
               };
               let response = await Api.patchContent(
                    `/cart/${user.userid}`,
                    patched
               );
               if (response.ok) {
                    setCart(response.data);
               } else {
                    setErrorMsg(response.error);
               }
          }
     };
     const deleteFromCart = async (productid) => {
          let response = await Api.deleteContent(
               `/cart/${user.userid}/${productid}`
          );
          if (response.ok) {
               setCart(response.data);
          } else {
               setErrorMsg(response.error);
          }
     };

     const addToCart = async (id) => {
          if (user) {
               let newCartObj = {
                    userid: user.userid,
                    productid: id,
               };
               let response = await Api.addContent("/cart", newCartObj);
               if (response.ok) {
                    setCart(response.data);
               } else {
                    setErrorMsg(response.error);
               }
          }
     };

     const emptyCart = async () => {
          let response = await Api.deleteContent(
               `/cart/${user.userid}/empty`,
               {}
          );
          if (response.ok) {
               setCart(response.data);
          } else {
               setErrorMsg(response.error);
          }
     };

     const contextObj = {
          cart,
          increaseOrderCountCB: increaseOrderCount,
          decreaseOrderCountCB: decreaseOrderCount,
          deleteFromCartCB: deleteFromCart,
          addToCartCB: addToCart,
          emptyCartCB: emptyCart,
     };


    async function updateUserInfo(userObj, route) {
      let response = await Api.patchContent(route, userObj);
      if (response.ok) {
          Local.saveUserInfo(response.data.token, response.data.user);
          setUser(response.data.user);
          setLoginError('');
      } else {
          setLoginError('Update failed');
          console.log(loginError);
      }
    }
  
     return (
          <div className="App">
               <CartContext.Provider value={contextObj}>
                    <header className="App-header">
                         <p>Items in cart: {cart.length}</p>
                         <Navbar />
                         <Routes>
                              <Route path="/" element={<Home />} />
                              <Route
                                   path="/products"
                                   element={<Products user={user} />}
                              />
                              <Route
                                   path="/checkout"
                                   element={<Checkout user={user} />}
                              />
                              <Route
                                   path="/user/login"
                                   element={
                                        <UserLogin
                                             userLogInCb={(
                                                  username,
                                                  password
                                             ) =>
                                                  handleUserLogin(
                                                       username,
                                                       password
                                                  )
                                             }
                                        />
                                   }
                                   loginError={loginError}
                              />
                              <Route
                                   path="/user/signup"
                                   element={
                                        <UserSignUp
                                             addUserCb={(newUser) =>
                                                  handleUserSignUp(newUser)
                                             }
                                        />
                                   }
                              />
                              <Route
                                   path="/seller/login"
                                   element={
                                        <SellerLogin
                                             sellerLogInCb={(
                                                  username,
                                                  password
                                             ) =>
                                                  handleSellerLogin(
                                                       username,
                                                       password
                                                  )
                                             }
                                        />
                                   }
                                   loginError={loginError}
                              />
                              <Route
                                   path="/seller/signup"
                                   element={
                                        <SellerSignUp
                                             addSellerCb={(newSeller) =>
                                                  handleSellerSignUp(newSeller)
                                             }
                                        />
                                   }
                              />

                              <Route
                                   path="/users/private"
                                   element={
                                        <PrivateRouteUsers>
                                             <TestPrivateUsers />
                                        </PrivateRouteUsers>
                                   }
                              />


                              <Route
                                   path="/sellers/private"
                                   element={
                                        <PrivateRouteSellers>
                                             <TestPrivateSellers />
                                        </PrivateRouteSellers>
                                   }
                              />

                              <Route
                                   path="/update/shop"
                                   element={<UpdateShopDetails />}
                              />

                              <Route path="shop/:sellerid" 
                              element={<Shopfront seller={seller}/>} />

                              <Route
                                   path="/usersettings"
                                   element={
                                        <PrivateRouteUsers>
                                             <UserSettings user={user} updateUserCB={(updatedUserObject, route) => updateUserInfo(updatedUserObject, route)} />
                                        </PrivateRouteUsers>
                                   }
                              />
                         </Routes>
                    </header>
               </CartContext.Provider>
          </div>
     );
}

export default App;
