import React from 'react';
import CartSummary from '../components/CartSummary';
import FinishedPurchase from '../components/FinishedPurchase';
import PaymentMethod from '../components/PaymentMethod';

class Checkout extends React.Component {
  render() {
    return (
      <div>
        <h1>Finalizar Compra</h1>
        <CartSummary />
        <FinishedPurchase />
        <PaymentMethod />
      </div>
    );
  }
}

export default Checkout;
