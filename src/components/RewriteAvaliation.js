import PropTypes from 'prop-types';
import React from 'react';

class RewriteAvaliation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProductID: [],
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const userAvaliationList = JSON.parse(localStorage.getItem('userAvaliationList'));
    const objProductID = userAvaliationList.find(
      (avaliationObj) => (
        avaliationObj.id === id
      ),
    );
    if (objProductID) {
      this.setState({
        listProductID: objProductID.avaliation,
      });
    }
  }

  render() {
    const { listProductID } = this.state;
    return (
      <div>
        {(listProductID !== [])
          && listProductID.map((avaliation, index) => (
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
  id: PropTypes.string.isRequired,
};

export default RewriteAvaliation;
