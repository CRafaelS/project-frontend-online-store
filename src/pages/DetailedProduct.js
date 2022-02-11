import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import RewriteAvaliation from '../components/RewriteAvaliation';
import '../index.css';
import { getProductsID } from '../services/api';

class DetailedProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      productData: {},
      arrayAttributes: [],
      email: '',
      textarea: '',
      stars: 0,
      id: '',
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
  };

  handleClick = (product) => {
    const cart = JSON.parse(localStorage.getItem('cartTrybe'));
    console.log(product);
    if (cart.some((cartItem) => cartItem.product.id === product.id)) {
      cart.forEach((cartItem, index) => {
        if (cartItem.product.id === product.id) {
          cart[index].quantity += 1;
        }
      });
    } else {
      cart.push({
        product,
        quantity: 1,
      });
    }
    localStorage.setItem('cartTrybe', JSON.stringify(cart));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: [value],
    });
  }

  onClickForm = () => {
    const { email, textarea, stars, id } = this.state;
    const userAvaliationList = JSON.parse(localStorage.getItem('userAvaliationList'));
    const objAvaliation = {
      email,
      textarea,
      stars,
    };

    const objDoLocalstorage = {
      id,
      avaliation: [
        objAvaliation,
      ],
    };
    if (!userAvaliationList) {
      userAvaliationList.push(objDoLocalstorage);
    } else if (userAvaliationList.some((avaliation) => (
      avaliation.id === id
    ))) {
      userAvaliationList.forEach((avaliationObj, index) => {
        if (avaliationObj.id === id) {
          userAvaliationList[index].avaliation.push(objAvaliation);
        }
      });
    } else {
      userAvaliationList.push(objDoLocalstorage);
    }
    localStorage.setItem('userAvaliationList', JSON.stringify(userAvaliationList));
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { productData, arrayAttributes, email, textarea } = this.state;
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
                { '  ' }
                { atribute.value_name }
              </span>
            </div>
          ))}
        </div>

        <form>
          <div className="star-rating__stars">
            <label
              htmlFor="product-detail-email"
              className="star-rating__label"
            >
              <input
                className="star-rating__input"
                data-testid="product-detail-email"
                value={ email }
                name="email"
                type="text"
                id={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="1-rating"
              className="star-rating__label"
            >
              <input
                className="star-rating__input"
                type="radio"
                name="stars"
                value={ 1 }
                data-testid="1-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="2-rating"
              className="star-rating__label"
            >
              <input
                className="star-rating__input"
                type="radio"
                name="stars"
                value={ 2 }
                data-testid="2-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="3-rating"
              className="star-rating__label"
            >
              <input
                className="star-rating__input"
                type="radio"
                name="stars"
                value={ 3 }
                data-testid="3-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="4-rating"
              className="star-rating__label"
            >
              <input
                className="star-rating__input"
                type="radio"
                name="stars"
                value={ 4 }
                data-testid="4-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="5-rating"
              className="star-rating__label"
            >
              <input
                className="star-rating__input"
                type="radio"
                name="stars"
                value={ 5 }
                data-testid="5-rating"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            name="textarea"
            id={ textarea }
            value={ textarea }
            onChange={ this.handleChange }
          />

          <button
            data-testid="submit-review-btn"
            type="button"
            disabled={ this.validateForm }
            onClick={ this.onClickForm }
          >
            Avaliar
          </button>
        </form>
        <RewriteAvaliation id={ id } />
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
