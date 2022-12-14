import React from 'react';

class CartSummary extends React.Component {
  constructor() {
    super();
    const cartItems = JSON.parse(localStorage.getItem('cartTrybe'));
    this.state = {
      cartItems,
    };
  }

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        <h2>Resumo do carrinho</h2>
        { cartItems.map((item) => (
          <div key={ item.product.id }>
            <h5>{ item.product.title }</h5>
            <img
              src={ item.product.thumbnail }
              alt={ item.product.title }
              width={ 70 }
            />
            <p>{ `R$ ${item.product.price}` }</p>
            <p>{ item.quantity }</p>
          </div>
        )) }
        <h3>
          { `R$ ${cartItems.reduce((sum, { product: { price }, quantity }) => (
            sum + price * quantity
          ), 0)}` }
        </h3>
      </div>
    );
  }
}

export default CartSummary;
