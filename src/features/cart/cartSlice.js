import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'cart',
  initialState: {
    value: 0,
    items: [],
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    addtocart: (state, action) => { 
      state.items = [
        ...state.items,
        action.payload,
      ]
    },
    removefromcart: (state, action) => { 
      state.items = state.items.filter(item => item._id !== action.payload._id);
    }
  },
});

export const { increment, decrement, incrementByAmount, addtocart } = slice.actions;

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectCount = state => state.cart.value;

export default slice.reducer;
