import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Carrinho from './pages/Carrinho';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={ Home } />
      <Route path="/carrinho" component={ Carrinho } />
    </BrowserRouter>

  );
}

export default App;
