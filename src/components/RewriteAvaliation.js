import PropTypes from 'prop-types';
import React from 'react';
import starImage from '../images/starpreta.jpg';

class RewriteAvaliation extends React.Component {
  countStars = (quantityStars) => {
    const listQuantity = [];
    for (let i = 1; i <= Number(quantityStars); i += 1) {
      listQuantity.push(i);
    }
    return listQuantity;
  }

  render() {
    const { list } = this.props;
    return (
      <div>
        {(list !== [])
          && list.map((avaliation, index) => (
            <div key={ index }>
              <h4 data-testid="product-detail-email">
                { avaliation.email }
              </h4>

              { this.countStars(avaliation.stars).map((star) => (
                <span key={ star }>
                  <img
                    src={ starImage }
                    alt={ star }
                    width="20"
                    height="20"
                  />
                </span>
              ))}

              <p>
                {avaliation.textarea}
              </p>
            </div>
          ))}
      </div>
    );
  }
}

RewriteAvaliation.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RewriteAvaliation;
