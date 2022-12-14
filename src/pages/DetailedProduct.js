import PropTypes from 'prop-types';
import React from 'react';
import CartButton from '../components/CartButton';
import PreviousReviews from '../components/PreviousReviews';
import { getProductsID } from '../services/api';

class DetailedProduct extends React.Component {
  constructor() {
    super();
    const cartItems = JSON.parse(localStorage.getItem('cartTrybe'));
    this.state = {
      productData: {},
      arrayAttributes: [],
      email: '',
      textarea: '',
      stars: 0,
      listProductID: [],
      cartQuantity: cartItems.reduce((sum, { quantity }) => sum + quantity, 0),
    };

    this.cartQuantityChange = this.cartQuantityChange.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.onSubmitSearch(id);
    this.getProductAvaliation(id);
  }

  getProductAvaliation = (id) => {
    const userAvaliationList = JSON.parse(localStorage.getItem('userAvaliationList'));
    const objProductID = userAvaliationList.find(
      (avaliationObj) => (avaliationObj.id === id),
    );
    if (objProductID) {
      this.setState({
        listProductID: objProductID.avaliation,
      });
    }
  }

  onSubmitSearch = async (id) => {
    const productData = await getProductsID(id);
    this.setState({ productData, arrayAttributes: productData.attributes });
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
      cart.push({ product, quantity: 1 });
    }
    localStorage.setItem('cartTrybe', JSON.stringify(cart));
    this.cartQuantityChange();
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: [value] });
  }

  onClickForm = () => {
    const { match: { params: { id } } } = this.props;
    const { email, textarea, stars } = this.state;
    const userAvaliationList = JSON.parse(localStorage.getItem('userAvaliationList'));
    const objAvaliation = { email, textarea, stars };
    const objDoLocalstorage = { id, avaliation: [objAvaliation] };
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
    this.getProductAvaliation(id);
    this.setState({ email: '', textarea: '', stars: 0 });
  }

  cartQuantityChange() {
    this.setState(({ cartQuantity: oldCartQuantity }) => ({
      cartQuantity: oldCartQuantity + 1,
    }));
  }

  render() {
    const { productData, arrayAttributes, email,
      textarea, listProductID, cartQuantity } = this.state;
    return (
      <div>
        <h1>Especifica????es T??cnicas</h1>
        <CartButton cartQuantity={ cartQuantity } />
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
                { atribute.name }
                :
                { atribute.value_name }
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.handleClick(productData) }
          id={ productData.id }
        >
          Adicionar ao Carrinho
        </button>
        <form>
          <label
            htmlFor="product-detail-email"
          >
            <input
              placeholder="Email"
              data-testid="product-detail-email"
              value={ email }
              name="email"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <div className="star-rating__stars">
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
                id="1-rating"
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
                id="2-rating"
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
                id="3-rating"
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
                id="4-rating"
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
                id="5-rating"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <textarea
            placeholder="Mensagem (opcional)"
            data-testid="product-detail-evaluation"
            name="textarea"
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
        <PreviousReviews list={ listProductID } />
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
