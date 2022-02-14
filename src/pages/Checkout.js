import React from 'react';
import FinishedPurchase from '../components/FinishedPurchase';
import PaymentMethod from '../components/PaymentMethod';

class Checkout extends React.Component {
  render() {
    return (
      <div>
        <FinishedPurchase />
        <PaymentMethod />
      </div>
    );
  }
}

export default Checkout;
