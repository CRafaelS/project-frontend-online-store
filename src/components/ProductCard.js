import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  handleClick = (event) => {
    const { id } = event.target;
    const cart = JSON.parse(localStorage.getItem('cartTrybe'));
    if (cart.some((product) => product.id === id)) {
      cart.forEach((product, index) => {
        if (product.id === id) {
          cart[index].quantity += 1;
        }
      });
    } else {
      cart.push({
        id,
        quantity: 1,
      });
    }
    localStorage.setItem('cartTrybe', JSON.stringify(cart));
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
              onClick={ this.handleClick }
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
};

export default ProductCard;
