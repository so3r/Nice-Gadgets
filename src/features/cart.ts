import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductWithQuantity } from '../types/ProductWithQuantity';
// import { Product } from '../types/Product';

const initialState = [] as ProductWithQuantity[];

export const cartProductsSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    toggleProducts(
      cartProducts,
      { payload }: PayloadAction<ProductWithQuantity>,
    ) {
      //parametrs -> product
      return cartProducts.find((product) => product.id === payload.id) ?
          cartProducts.filter((product) => product.id !== payload.id)
        : [...cartProducts, { ...payload, quantity: 1 }];
    },
    removeProduct(cartProducts, { payload }: PayloadAction<number>) {
      //parametrs -> product.id
      return cartProducts.filter((product) => product.id !== payload);
    },
    increaseQuantity(cartProducts, { payload }: PayloadAction<number>) {
      //parametrs -> product.id
      return cartProducts.map((product) =>
        product.id === payload ?
          { ...product, quantity: product.quantity! + 1 }
        : product,
      );
    },
    decreaseQuantity(cartProducts, { payload }: PayloadAction<number>) {
      //parametrs -> product.id
      return cartProducts.map((product) =>
        product.id === payload ?
          { ...product, quantity: product.quantity! - 1 }
        : product,
      );
      //.filter((product) => product.quantity! > 0); use this or disable decrease button when quantity === 1
    },
  },
});
