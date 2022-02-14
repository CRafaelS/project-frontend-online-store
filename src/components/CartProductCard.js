import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FreteGratis from '../images/FreteGratis.png';

class CartProductCard extends Component {
  render() {
    const { product, quantity, quantityChange, shipping } = this.props;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">
          {product.title}
        </h3>
        {(shipping)
          && <img
            src={ FreteGratis }
            alt=" Frete Gratis"
            width={ 50 }
            data-testid="free-shipping"
          /> }
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
  shipping: PropTypes.bool.isRequired,
};

export default CartProductCard;
