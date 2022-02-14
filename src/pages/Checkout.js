import React from "react";

class Checkout extends React.Component {
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
        {cartItems.map((item) => (
          <div key={ item.product.id }>
            <h3>{ item.product.title }</h3>
            <img
              src={ item.product.thumbnail }
              alt={ item.product.title }
              width={ 200 }
            />
            <p>{ `R$ ${item.product.price}` }</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Checkout;
