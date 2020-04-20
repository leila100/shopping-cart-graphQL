import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import Checkout from "./checkout.component";

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_TOTAL = gql`
  {
    total @client
  }
`;

const CheckoutContainer = () => {
  return (
    <Query query={GET_CART_ITEMS}>
      {({ data: { cartItems } }) => (
        <Query query={GET_TOTAL}>{({ data: { total } }) => <Checkout cartItems={cartItems} total={total} />}</Query>
      )}
    </Query>
  );
};

export default CheckoutContainer;
