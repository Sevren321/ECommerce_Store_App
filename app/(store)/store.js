//first download zustand npm i zustand amazing lightweight global state manager use it with persist methods to persist to the local storage

import { create } from "zustand";

const useCart = create(
  // take a callback function with a set and get method
  (set, get) => ({
    // return an object store within all our parameters
    // cart with a list of all products and quantities
    cart: [],
    //product that gets selected an object
    product: {},
    openModal: false,
    setOpenModal : () => {
      set((state) => {
        return {
          ...state,
          //inverse for check out page
          openModal: !state.openModal
        }
      })
    },
    setProduct: (params) => {
      const { newProduct } = params;
      set((state) => {
        return {
          ...state,
          product: newProduct,
        };
      });
    },
    //methods used to interact with our store
    addItemToCart: (params) => {
      const { newItem } = params;
      // after access to new item call set method receives the current state and return a new state because previous is immutable
      set((state) => {
        //create a new array then set cart equal to new array to add item to cart
        const newCart = [...state.cart, newItem];
        return {
          ...state,
          cart: newCart,
        };
      });
    },
    removeItemFromCart: (params) => {
      const { itemIndex } = params;
      set((state) => {
        //filter to take the element and element index return
        const newCart = state.cart.filter((element, elementIndex) => {
          //every other entry will return true this one that we want to remove will return false and be removed
          return elementIndex !== itemIndex;
        });
        return {
          ...state,
          cart: newCart,
        };
      });
    },
    emptyCart: () => {
      set((state) => {
        const newCart = [];
        //new cart is equal to an empty array return new cart
        return {
          ...state,
          cart: newCart,
        };
      });
    },
  })
);
//export out
export default useCart;
