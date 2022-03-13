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
import UserSignUp from './pages/UserSignUp';
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  // const history = useHistory();

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

  async function handleUserLogout() {
    Local.removeUserInfo();
    setUser(Local.getUser());
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

  return (
    <div className="App">
      <header className="App-header">
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/user-login" 
            element={<UserLogin userLogInCb={(username, password) => handleUserLogin(username, password)}/>}
                                loginError={loginError}/>
          <Route path="/user-signup" element={<UserSignUp addUserCb={(newUser) => handleUserSignUp(newUser)} />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
