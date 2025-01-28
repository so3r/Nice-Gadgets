import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const initialState = [] as Product[];

export const favoriteProductsSlice = createSlice({
  name: 'favoriteProducts',
  initialState,
  reducers: {
    toggleProducts(favoriteProducts, { payload }: PayloadAction<Product>) {
      //parametrs -> product
      return favoriteProducts.find((product) => product.id === payload.id) ?
          favoriteProducts.filter((product) => product.id !== payload.id)
        : [...favoriteProducts, payload];
    },
  },
});
