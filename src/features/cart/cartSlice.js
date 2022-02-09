import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'cart',
  initialState: {
    value: 0,
    items: [],
  },
  reducers: {
    addtocart: (state, action) => { 
      state.items = [
        ...state.items,
        action.payload,
      ]
    },
    removefromcart: (state, action) => { 
      const index = state.items.findIndex(item => item._id === action.payload._id);
      state.items.splice(index, 1);
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
