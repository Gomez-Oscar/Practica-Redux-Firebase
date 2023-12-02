import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: 'product', 
  initialState: {
    products: [],
    error: null
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((product)=> product.id === action.payload.id ? { ...action.payload }: product)
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(( item ) => item.id !== action.payload)
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  }
})

export const { setProducts, addProduct, updateProduct, deleteProduct, setError } = productSlice.actions

export default productSlice.reducer