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

const CLEAR_ITEM = gql`
  mutation ClearItem($item: Item!) {
    clearItem(item: $item) @client
  }
`;

const CheckoutItemContainer = (props) => {
  return (
    <Mutation mutation={ADD_ITEM_TO_CART}>
      {(addItemToCart) => (
        <Mutation mutation={REMOVE_ITEM}>
          {(removeItem) => (
            <Mutation mutation={CLEAR_ITEM}>
              {(clearItem) => (
                <CheckoutItem
                  {...props}
                  addItem={(item) => addItemToCart({ variables: { item } })}
                  removeItem={(item) => removeItem({ variables: { item } })}
                  clearItem={(item) => clearItem({ variables: { item } })}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      )}
    </Mutation>
  );
};

export default CheckoutItemContainer;
