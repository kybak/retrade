import {addAction, addReducer} from 'meteor/vulcan:core';

let cart = [];
// register messages actions
addAction({
  ui: {
    updateCart(item) {
      return {
        type: 'UPDATECART',
        cart: item
      };
    },
    removeCart(id) {
      return {
        type: 'REMOVECART',
        component: id
      };
    }
  }
});


// register messages reducer
addReducer({
  ui: (state = {cart: []}, action) => {
    if (action.cart && action.cart._id) cart.push(action.cart);
    if (action.component) cart = cart.filter(c => c._id !== action.component);

    switch (action.type) {
      case 'UPDATECART':
        return {
          ...state,
          cart: cart
        };
      case 'REMOVECART':
        return {
          ...state,
          cart: cart
        };
      default:
        return state;
    }
  },
});

