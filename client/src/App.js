import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';

// Import pages
import Checkout from '../pages/Checkout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Routes>

          <Route path="/checkout" element={<Checkout />} />

        </Routes>
      </header>
    </div>
  );
}

export default App;
