import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getCategories } from '../services/api';
/* import {BrowserRouter} from 'react-router-dom' */

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
      selectedCategory: '',
      loading: true,
    };

    this.onCategoryChange = this.onCategoryChange.bind(this);
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categoriesList: categories,
      loading: false,
    });
  }

  onCategoryChange(event) {
    const { value } = event.target;
    this.setState({
      selectedCategory: value,
    });
  }

  render() {
    const { categoriesList, loading, selectedCategory } = this.state;
    console.log(selectedCategory);
    return (
      <>
        { loading
          ? <p>Carregando...</p>
          : (
            <Categories
              categoriesList={ categoriesList }
              onChange={ this.onCategoryChange }
              selected={ selectedCategory }
            />
          )}

        <label htmlFor="pesquisa">
          <input
            type="text"
            /* value="home-initial-message" */
            id="pesquisa"
          />
        </label>
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
        </div>
      </>
    );
  }
}

export default Home;
