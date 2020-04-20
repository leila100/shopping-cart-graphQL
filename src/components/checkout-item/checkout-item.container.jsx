import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

import CheckoutItem from "./checkout-item.component";

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const CheckoutItemContainer = (props) => {
  return (
    <Mutation mutation={ADD_ITEM_TO_CART}>
      {(addItemToCart) => <CheckoutItem {...props} addItem={(item) => addItemToCart({ variables: { item } })} />}
    </Mutation>
  );
};

export default CheckoutItemContainer;
