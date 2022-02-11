import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsID } from '../services/api';

class CartProductCard extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    const product = await getProductsID(id);
    this.setState({
      product,
      loading: false,
    });
  }

  render() {
    const { product, loading } = this.state;
    const { quantity, quantityChange, id } = this.props;
    return (
      <div>
        {loading
          ? <p>Carregando...</p>
          : (
            <>
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
                onClick={ () => quantityChange(id, 'decrease') }
              >
                -
              </button>
              <button
                type="button"
                onClick={ () => quantityChange(id, 'remove') }
                name="remove"
              >
                x
              </button>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => quantityChange(id, 'increase') }
              >
                +
              </button>
            </>
          )}
      </div>
    );
  }
}

CartProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  quantityChange: PropTypes.func.isRequired,
};

export default CartProductCard;
