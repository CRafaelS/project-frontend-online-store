import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  handleClick = (product) => {
    const { cartQuantityChange } = this.props;
    const cart = JSON.parse(localStorage.getItem('cartTrybe'));
    if (cart.some((cartItem) => cartItem.product.id === product.id)) {
      cart.forEach((cartItem, index) => {
        if (cartItem.product.id === product.id) {
          cart[index].quantity += 1;
        }
      });
    } else {
      cart.push({
        product,
        quantity: 1,
      });
    }
    localStorage.setItem('cartTrybe', JSON.stringify(cart));
    cartQuantityChange();
  }

  render() {
    const { listaProdutos } = this.props;
    return (
      <div>
        { listaProdutos.map((produto) => (
          <div
            key={ produto.id }
            data-testid="product"
          >
            <h4>{ produto.title }</h4>
            <img
              src={ produto.thumbnail }
              alt={ produto.title }
              width="150"
              height="200"
            />
            <h3>{ produto.price }</h3>
            <Link
              data-testid="product-detail-link"
              to={ `/detalhe/${produto.id}` }
            >
              Detalhe
            </Link>
            <button
              id={ produto.id }
              type="button"
              onClick={ () => this.handleClick(produto) }
              data-testid="product-add-to-cart"
            >
              Adicionar  ao carrinho
            </button>
          </div>
        ))}
      </div>
    );
  }
}

ProductCard.propTypes = {
  listaProdutos: PropTypes.arrayOf(PropTypes.object).isRequired,
  cartQuantityChange: PropTypes.func.isRequired,
};

export default ProductCard;
