import React from 'react';
import PropTypes from 'prop-types';
import CartProductCard from './CartProductCard';

class CartProductListing extends React.Component {
  render() {
    const { cartList, quantityChange } = this.props;
    return (
      <section>
        {cartList.map(({ id, quantity }) => (
          <CartProductCard
            key={ id }
            id={ id }
            quantity={ quantity }
            quantityChange={ quantityChange }
          />
        ))}
      </section>
    );
  }
}

CartProductListing.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantityChange: PropTypes.func.isRequired,
};

export default CartProductListing;
