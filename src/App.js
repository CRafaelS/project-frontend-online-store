import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Carrinho from './pages/Carrinho';
import Home from './pages/Home';

class App extends Component {
  constructor() {
    super();
    if (!localStorage.getItem('cartTrybe')) {
      localStorage.setItem('cartTrybe', JSON.stringify([]));
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={ Home } />
        <Route path="/carrinho" component={ Carrinho } />
      </BrowserRouter>

    );
  }
}

export default App;
