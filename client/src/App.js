import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';

// Import pages
import Checkout from './pages/Checkout';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
  
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />

        </Routes>
      </header>
    </div>
  );
}

export default App;
