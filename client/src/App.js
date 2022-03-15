import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Local from './helpers/Local';
import Api from "./helpers/Api";

// Import pages
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import SellerLogin from './pages/SellerLogin';
import UserSignUp from './pages/UserSignUp';
import SellerSignUp from './pages/SellerSignUp';
import ErrorPage from "./pages/ErrorPage";
import Products from './pages/Products';

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [seller, setSeller] = useState(Local.getSeller());
  const [cart, setCart] = useState([]);
  const [loginError, setLoginError] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  // const history = useHistory();

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
      let userid = user.userid;
      let response = await Api.getContent(`/cart/${userid}`);
      if (response.ok) {
        setCart(response.data);
      }
      else {
        setErrorMsg(response.error)
      }
    };


  async function handleUserLogin(username, password) {
    let response = await Api.loginUser(username, password);
    console.log(response)
    if (response.ok) {
        Local.saveUserInfo(response.data.token, response.data.user);
        setUser(response.data.user);
        setLoginError('');
        navigate('/');
    } else {
        setLoginError(response.error);
        console.log(loginError);
    }
  }

  async function handleSellerLogin(username, password) {
    let response = await Api.loginSeller(username, password);
    console.log(response)
    if (response.ok) {
        Local.saveSellerInfo(response.data.token, response.data.seller);
        setSeller(response.data.seller);
        setLoginError('');
        navigate('/');
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
    let response = await Api.userSignUp(newUser.username, newUser.password, newUser.email);
    if (response.ok) {
      setLoginError('');
      console.log("Sign up successful!")
  } else {
      setLoginError(response.error);
      console.log(loginError);
  }
  }

  const handleSellerSignUp = async (newSeller) => {
    let response = await Api.sellerSignUp(newSeller.username, newSeller.password, newSeller.email);
    if (response.ok) {
      setLoginError('');
      console.log("Sign up successful!")
  } else {
      setLoginError(response.error);
      console.log(loginError);
  }
  }

  // Change user info

  async function updateUserData(userObj, route) {
    let response = await Api.updateUserData(userObj, route);
    console.log(response)
    if (response.ok) {
        Local.saveUserInfo(response.data.token, response.data.user);
        setUser(response.data.user);
        setLoginError('');
    } else {
        setLoginError('Login failed');
        console.log(loginError);
    }
  }

  async function updateSellerData(sellerObj, route) {
    let response = await Api.updateSellerData(sellerObj, route);
    console.log(response)
    if (response.ok) {
        Local.saveSellerInfo(response.data.token, response.data.seller);
        setSeller(response.data.seller);
        setLoginError('');
    } else {
        setLoginError('Login failed');
        console.log(loginError);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <p>Current user: {user.username} <br />
        Cart: {cart.length}</p>
        
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products user={user} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/user-login" element={<UserLogin userLogInCb={(username, password) => handleUserLogin(username, password)}/>} loginError={loginError}/>
          <Route path="/user-signup" element={<UserSignUp addUserCb={(newUser) => handleUserSignUp(newUser)} />} />
          <Route path="/seller-login" element={<SellerLogin sellerLogInCb={(username, password) => handleSellerLogin(username, password)}/>} loginError={loginError}/>
          <Route path="/seller-signup" element={<SellerSignUp addSellerCb={(newSeller) => handleSellerSignUp(newSeller)} />} />

          {/* <Route path="/signup" element={<SignUp addUserCb={(newUser) => handleUserSignUp(newUser)} addSellerCb={(newSeller) => handleSellerSignUp(newSeller)}/>} /> */}

        </Routes>
      </header>
    </div>
  );
}

export default App;
