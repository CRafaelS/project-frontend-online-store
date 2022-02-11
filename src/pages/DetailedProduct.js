import PropTypes from 'prop-types';
import React from 'react';
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
    console.log(id);
    this.onSubmitSearch(id);
  }

  onSubmitSearch = async (id) => {
    const productData = await getProductsID(id);
    console.log(productData);
    this.setState({
      productData,
      arrayAttributes: productData.attributes,
    });
  }

  handleClick = ( { target } ) => {
    
  }

  render() {
    const { productData, arrayAttributes } = this.state;
    return (
      <div>
        <h1>Especificações Técnicas</h1>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.handleClick }
          id={}
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
