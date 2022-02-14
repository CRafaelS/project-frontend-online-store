import React from 'react';
import CartButton from '../components/CartButton';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    const cartItems = JSON.parse(localStorage.getItem('cartTrybe'));
    this.state = {
      categoriesList: [],
      selectedCategory: '',
      loadingCategory: true,
      nomeProdutoPesquisado: '',
      listaProdutos: [],
      cartQuantity: cartItems.reduce((sum, { quantity }) => sum + quantity, 0),
    };

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.cartQuantityChange = this.cartQuantityChange.bind(this);
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

  cartQuantityChange() {
    this.setState(({ cartQuantity: oldCartQuantity }) => ({
      cartQuantity: oldCartQuantity + 1,
    }));
  }

  render() {
    const { nomeProdutoPesquisado, listaProdutos, cartQuantity,
      categoriesList, loadingCategory, selectedCategory } = this.state;
    return (
      <main>
        <CartButton cartQuantity={ cartQuantity } />
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
            cartQuantityChange={ this.cartQuantityChange }
          />
        ) }
      </main>
    );
  }
}

export default Home;
