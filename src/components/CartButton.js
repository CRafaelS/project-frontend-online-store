import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CartButton extends React.Component {
  render() {
    const { cartQuantity } = this.props;
    return (
      <Link
        to="/carrinho"
        data-testid="shopping-cart-button"
      >
        <button type="button">
          Carrinho
        </button>
        <div
          style={ {
            borderRadius: '100%',
            position: 'relative',
            top: -13,
            right: -55,
            display: 'flex',
            width: '25px',
            height: '25px',
            backgroundColor: 'blue',
            color: 'white',
          } }
        >
          <p data-testid="shopping-cart-size" style={ { margin: 'auto' } }>
            {cartQuantity}
          </p>
        </div>
      </Link>
    );
  }
}

CartButton.propTypes = {
  cartQuantity: PropTypes.number.isRequired,
};

export default CartButton;
