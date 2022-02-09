import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeProdutoPesquisado: '',
      listaProdutos: [],
    };
  }

  onChangeInput = ({ target }) => {
    const { value } = target;
    this.setState({
      nomeProdutoPesquisado: value,
    });
  }

  onSubmitSearch = async () => {
    const { nomeProdutoPesquisado } = this.state;
    const listaProduto = await getProductsFromCategoryAndQuery({ nomeProdutoPesquisado });
    this.setState({
      listaProdutos: listaProduto.results,
    });
  }

  render() {
    const { nomeProdutoPesquisado, listaProdutos } = this.state;
    console.log(listaProdutos);
    return (
      <>
        <form>
          <label htmlFor="pesquisa">
            <input
              data-testid="query-input"
              type="text"
              value={ nomeProdutoPesquisado }
              id="pesquisa"
              onChange={ this.onChangeInput }
            />
          </label>
          <button
            type="button"
            onClick={ this.onSubmitSearch }
            data-testid="query-button"
          >
            Enter
          </button>
        </form>

        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <div>
          <Link
            to="/carrinho"
            data-testid="shopping-cart-button"
          >
            Carrinho
          </Link>

          { listaProdutos.map((produto, index) => (
            <div
              key={ index }
              data-testid="product"
            >
              <Card
                dadosProduto={ produto }
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Home;
