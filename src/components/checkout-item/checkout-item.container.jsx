import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

import CheckoutItem from "./checkout-item.component";

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const REMOVE_ITEM = gql`
  mutation RemoveItem($item: Item!) {
    removeItem(item: $item) @client
  }
`;

const CheckoutItemContainer = (props) => {
  return (
    <Mutation mutation={ADD_ITEM_TO_CART}>
      {(addItemToCart) => (
        <Mutation mutation={REMOVE_ITEM}>
          {(removeItem) => (
            <CheckoutItem
              {...props}
              addItem={(item) => addItemToCart({ variables: { item } })}
              removeItem={(item) => removeItem({ variables: { item } })}
            />
          )}
        </Mutation>
      )}
    </Mutation>
  );
};

export default CheckoutItemContainer;
