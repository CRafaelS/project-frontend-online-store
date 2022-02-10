import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

class DetalheProduto extends React.Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    this.onSubmitSearch(id);
  }

  onSubmitSearch = async (id) => {
    const dadosProduto = await getProductsFromCategoryAndQuery({ id });
    console.log(dadosProduto);
    // this.setState({
    //   listaProdutos: listaProduto.results,
    // });
  }

  render() {
    return (
      <div />
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
