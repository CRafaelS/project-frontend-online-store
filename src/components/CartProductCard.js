import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CartProductCard extends Component {
  stockValidate = (product, quantity) => {
    console.log(product);
    if (product.available_quantity <= quantity) {
      return true;
    }
    return false;
  }

  render() {
    const { product, quantity, quantityChange } = this.props;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">
          {product.title}
        </h3>
        <img src={ product.thumbnail } alt={ product.title } />
        <p
          data-testid="shopping-cart-product-quantity"
        >
          {`Quantidade: ${quantity}`}
        </p>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ () => quantityChange(product, 'decrease') }
        >
          -
        </button>
        <button
          type="button"
          onClick={ () => quantityChange(product, 'remove') }
          name="remove"
        >
          x
        </button>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ () => quantityChange(product, 'increase') }
          disabled={ this.stockValidate(product, quantity) }
        >
          +
        </button>
      </div>
    );
  }
}

CartProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  quantityChange: PropTypes.func.isRequired,
};

export default CartProductCard;
