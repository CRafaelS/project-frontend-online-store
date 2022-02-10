import React from 'react';
import PropTypes from 'prop-types';
import CartProductCard from './CartProductCard';

class CartProductListing extends React.Component {
  render() {
    const { cartList } = this.props;
    return (
      <section>
        {cartList.map(({ id, quantity }) => (
          <CartProductCard key={ id } id={ id } quantity={ quantity } />
        ))}
      </section>
    );
  }
}

CartProductListing.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CartProductListing;
