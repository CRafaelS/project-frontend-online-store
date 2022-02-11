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

  componentDidUpdate() {
    const { cartList } = this.state;
    localStorage.setItem('cartTrybe', JSON.stringify(cartList));
  }

  quantityChange = (product, counterChange) => {
    const { cartList } = this.state;
    const index = cartList.reduce((acc, curr, currIndex) => {
      if (curr.product.id === product.id) { return currIndex; }
      return acc;
    }, '');
    console.log(index);
    switch (counterChange) {
    case 'increase':
      cartList[index].quantity += 1;
      break;
    case 'decrease':
      cartList[index].quantity -= 1;
      if (cartList[index].quantity < 1) { cartList.splice(index, 1); }
      break;
    case 'remove':
      cartList.splice(index, 1);
      break;
    default:
    }
    this.setState({
      cartList,
    });
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
