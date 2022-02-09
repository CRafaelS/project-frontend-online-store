import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  render() {
    const { categoriesList, onChange } = this.props;
    return (
      <section>
        {
          categoriesList.map((category) => (
            <label key={ category.id } htmlFor={ category.id } data-testid="category">
              <input
                name="categories"
                type="radio"
                id={ category.id }
                value={ category.id }
                onChange={ onChange }
              />
              { category.name }
            </label>
          ))
        }
      </section>
    );
  }
}

Categories.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Categories;
