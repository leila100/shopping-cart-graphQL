import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import Checkout from "./checkout.component";

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const CheckoutContainer = () => {
  return <Query query={GET_CART_ITEMS}>{({ data: { cartItems } }) => <Checkout cartItems={cartItems} />}</Query>;
};

export default CheckoutContainer;
