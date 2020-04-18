import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_lTb9H3cC6IOEaOWOPPXgc2Bp00gR4r5Jhg";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Succesful!");
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Shopping Cart Ltd.'
      billingAddress
      shippingAddress
      image='https://icon2.cleanpng.com/20171220/jpe/shopping-cart-png-5a3a8fca5f1485.3449050215137873383895.jpg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
