import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './users/userSlice';
import productReducer from './products/productSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer
  },
  middleware: [thunk],
});

export default store;
