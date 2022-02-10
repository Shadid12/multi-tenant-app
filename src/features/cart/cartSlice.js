import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'cart',
  initialState: {
    items: {},
  },
  reducers: {
    addtocart: (state, action) => { 
      if(state.items[action.payload._id]) {
        state.items[action.payload._id].quantity += 1;
      } else {
        state.items[action.payload._id] = {
          ...action.payload,
          quantity: 1,
        }
      }
    },
    removefromcart: (state, action) => {
      if(state.items[action.payload.id].quantity > 1) {
        state.items[action.payload.id].quantity -= 1;
      } else {
        delete state.items[action.payload.id];
      }
    }
  },
});

export const { removefromcart, addtocart } = slice.actions;

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectCount = state => state.cart.value;

export default slice.reducer;
