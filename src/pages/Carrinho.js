import React, { Component } from 'react';
import CartProductListing from '../components/CartProductListing';

class Carrinho extends Component {
  constructor() {
    super();

    const cart = JSON.parse(localStorage.getItem('cartTrybe'));
    this.state = {
      cartList: cart,
    };
  }

  render() {
    const { cartList } = this.state;
    const empty = cartList.length === 0;
    return (
      <main>
        <h1>Carrinho</h1>
        {empty
          ? (
            <h3 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h3>
          )
          : <CartProductListing cartList={ cartList } />}

      </main>
    );
  }
}

export default Carrinho;
