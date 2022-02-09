import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Carrinho from './Pages/Carrinho'

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={ Home } />
      <Route path="/carrinho" component={ Carrinho } />
    </BrowserRouter>

  );
}

export default App;
