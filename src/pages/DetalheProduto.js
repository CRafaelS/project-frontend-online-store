import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsID } from '../services/api';

class DetalheProduto extends React.Component {
  constructor() {
    super();
    this.state = {
      dadosDoProduto: {},
      arrayAttributes: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    this.onSubmitSearch(id);
  }

  onSubmitSearch = async (id) => {
    const dadosProduto = await getProductsID(id);
    console.log(dadosProduto);
    this.setState({
      dadosDoProduto: dadosProduto,
      arrayAttributes: dadosProduto.attributes,
    });
    const { arrayAttributes } = this.state;
    console.log(arrayAttributes);
  }

  render() {
    const { dadosDoProduto, arrayAttributes } = this.state;
    return (
      <div>
        <h1>Especificações Técnicas</h1>
        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        <h3 data-testid="product-detail-name">{ dadosDoProduto.title }</h3>
        <img
          src={ dadosDoProduto.thumbnail }
          width="300"
          alt={ dadosDoProduto.id }
        />
        <h2>
          R$:
          { dadosDoProduto.price }
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

DetalheProduto.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DetalheProduto;
