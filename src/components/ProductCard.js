import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
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
            <h3>{produto.price}</h3>
            <Link to={ `/detalhe/${produto.id}` }> Detalhe </Link>
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
