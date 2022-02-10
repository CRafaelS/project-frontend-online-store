import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Carrinho from './pages/Carrinho';
import DetalheProduto from './pages/DetalheProduto';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Home } />
      <Route path="/carrinho" component={ Carrinho } />
      <Route path="/detalhe/:id" render={ (props) => <DetalheProduto { ...props } /> } />
    </BrowserRouter>
  );
}

export default App;
