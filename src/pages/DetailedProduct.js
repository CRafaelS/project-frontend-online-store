import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsID } from '../services/api';

class DetailedProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      productData: {},
      arrayAttributes: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.onSubmitSearch(id);
  }

  onSubmitSearch = async (id) => {
    const productData = await getProductsID(id);
    this.setState({
      productData,
      arrayAttributes: productData.attributes,
    });
  }

  handleClick = (produto) => {
    const cart = JSON.parse(localStorage.getItem('cartTrybe'));
    if (cart.some((cartItem) => cartItem.product.id === produto.id)) {
      cart.forEach(({ product }, index) => {
        if (product.id === produto.id) {
          cart[index].quantity += 1;
        }
      });
    } else {
      cart.push({
        product: produto,
        quantity: 1,
      });
    }
    localStorage.setItem('cartTrybe', JSON.stringify(cart));
  }

  render() {
    const { productData, arrayAttributes } = this.state;
    return (
      <div>
        <h1>Especificações Técnicas</h1>
        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.handleClick(productData) }
          id={ productData.id }
        >
          Carrinho
        </button>
        <h3 data-testid="product-detail-name">{ productData.title }</h3>
        <img
          src={ productData.thumbnail }
          width="300"
          alt={ productData.id }
        />
        <h2>
          R$:
          { productData.price }
        </h2>
        <div className="especificacoes">
          { arrayAttributes.map((atribute, index) => (
            <div key={ index }>
              <span>

                {' '}
                { atribute.name }
                :
                { '  '}
              </span>
            </div>
          ))}
        </div>

      </div>
    );
  }
}

DetailedProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DetailedProduct;
