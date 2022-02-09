import React from 'react';
/* import {BrowserRouter} from 'react-router-dom' */

class Home extends React.Component {
  render() {
    return (
      <>
        <label htmlFor="pesquisa">
          <input
            type="text"
            /* value="home-initial-message" */
            id="pesquisa"
          />
        </label>
        <h3 data-testid="home-initial-message">Digite algum termo de pesquisa ou escolha uma categoria.</h3>
      </>
    );
  }
}

export default Home;
