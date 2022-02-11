import PropTypes from 'prop-types';
import React from 'react';

class RewriteAvaliation extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <div>
        {(list !== [])
          && list.map((avaliation, index) => (
            <div key={ index }>
              <p>Email:</p>
              <h3 data-testid="product-detail-email">
                { avaliation.email }
              </h3>
              <h1>
                <p>Stars:</p>
                {avaliation.stars}
              </h1>
              <p>Avaliação:</p>
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
