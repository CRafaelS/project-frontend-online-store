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
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categoriesList: categories,
    });
  }

  render() {
    const { categoriesList } = this.state;
    return (
      <>
        <Categories categoriesList={ categoriesList } />
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
