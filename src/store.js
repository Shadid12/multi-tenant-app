import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';


export default configureStore({
  reducer: {
    cart: cartReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});
