import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
      selectedCategory: '',
      loadingCategory: true,
      nomeProdutoPesquisado: '',
      listaProdutos: [],
    };

    this.onCategoryChange = this.onCategoryChange.bind(this);
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categoriesList: categories,
      loadingCategory: false,
    });
  }

  onChangeInput = ({ target }) => {
    const { value } = target;
    this.setState({
      nomeProdutoPesquisado: value,
    });
  }

  onCategoryChange(event) {
    const { nomeProdutoPesquisado } = this.state;
    const { value } = event.target;
    this.setState({
      selectedCategory: value,
    }, async () => {
      const listaProduto = await getProductsFromCategoryAndQuery(value,
        nomeProdutoPesquisado);
      this.setState({
        listaProdutos: listaProduto.results,
      });
    });
  }

  onSubmitSearch = async () => {
    const { selectedCategory, nomeProdutoPesquisado } = this.state;
    const listaProduto = await getProductsFromCategoryAndQuery(selectedCategory,
      nomeProdutoPesquisado);
    this.setState({
      listaProdutos: listaProduto.results,
    });
  }

  render() {
    const { nomeProdutoPesquisado, listaProdutos,
      categoriesList, loadingCategory, selectedCategory } = this.state;
    return (
      <main>
        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
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
        { loadingCategory
          ? <p>Carregando...</p>
          : (
            <Categories
              categoriesList={ categoriesList }
              onChange={ this.onCategoryChange }
              selected={ selectedCategory }
            />
          ) }
        { (!listaProdutos.length) ? (
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        ) : (
          <ProductCard
            listaProdutos={ listaProdutos }
          />
        ) }
      </main>
    );
  }
}

export default Home;