import { gql } from "apollo-boost";

import { addItemToCart, getCartItemCount, getTotal, removeItemFromCart, clearItemFromCart } from "./cart.utils";

export const typeDefs = gql`
  extend type item {
    quantity: Int
  }

  extend type DateTime {
    nanoseconds: Int!
    seconds: Int!
  }
  extend type User {
    id: ID!
    displayName: String!
    email: String!
    createdAt: DateTime!
  }

  extend type Mutation {
    SetCurrentUser(user: User!): User!
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
    RemoveItem(item: Item!): [Item]!
    ClearItem(item: Item!): [Item]!
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

const GET_TOTAL = gql`
  {
    total @client
  }
`;

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

export const resolvers = {
  Mutation: {
    setCurrentUser: (_root, { user }, { cache }) => {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { currentUser: user },
      });

      return user;
    },

    toggleCartHidden: (_root, _args, _context) => {
      const { cache } = _context;
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });
      return !cartHidden;
    },

    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      const newCartItems = addItemToCart(cartItems, item);

      // update cart item count
      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });

      // update the total
      cache.writeQuery({
        query: GET_TOTAL,
        data: { total: getTotal(newCartItems) },
      });

      //update cart item array
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });
      return newCartItems;
    },

    removeItem: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      const newCartItems = removeItemFromCart(cartItems, item);

      // update cart item count
      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });

      console.log("Get total: ", getTotal(newCartItems));
      // update the total
      cache.writeQuery({
        query: GET_TOTAL,
        data: { total: getTotal(newCartItems) },
      });

      //update cart item array
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });
      return newCartItems;
    },
    clearItem: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      const newCartItems = clearItemFromCart(cartItems, item);

      // update cart item count
      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });

      console.log("Get total: ", getTotal(newCartItems));
      // update the total
      cache.writeQuery({
        query: GET_TOTAL,
        data: { total: getTotal(newCartItems) },
      });

      //update cart item array
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });
      return newCartItems;
    },
  },
};
