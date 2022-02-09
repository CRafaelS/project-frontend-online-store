import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  render() {
    const { categoriesList } = this.props;
    return (
      <section>
        {
          categoriesList.map((categorie) => (
            <label key={ categorie.id } htmlFor={ categorie.id } data-testid="category">
              <input type="radio" id={ categorie.id } />
              { categorie.name }
            </label>
          ))
        }
      </section>
    );
  }
}

Categories.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Categories;
