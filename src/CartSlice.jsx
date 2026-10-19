
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }
    },

    removeItem: (state, action) => {
      const itemId = action.payload;

      state.items = state.items.filter(
        (item) => item.id !== itemId
      );
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.id === id
      );

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== id
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } =
  CartSlice.actions;

export default CartSlice.reducer;
