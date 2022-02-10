import React from "react";
import PropTypes from 'prop-types'; 

class DetalheProduto extends React.Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log(id);
  }

  render() {
    return (

    )
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
