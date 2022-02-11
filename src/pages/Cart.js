import React, { Component } from 'react';
import CartProductListing from '../components/CartProductListing';

class Cart extends Component {
  constructor() {
    super();

    const cart = JSON.parse(localStorage.getItem('cartTrybe'));
    this.state = {
      cartList: cart,
    };
  }

  quantityChange = (id, counterChange) => {
    const { cartList } = this.state;
    // switch (counterChange) {
    //   case 'increase':
        
    // }
  }

  render() {
    const { cartList } = this.state;
    const empty = cartList.length === 0;
    return (
      <main>
        <h1>Cart</h1>
        {empty
          ? (
            <h3 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h3>
          )
          : (
            <CartProductListing
              cartList={ cartList }
              quantityChange={ this.quantityChange }
            />
          )}
      </main>
    );
  }
}

export default Cart;
