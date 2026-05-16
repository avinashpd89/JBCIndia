import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    minPrice: 0,
    maxPrice: 1000000,
    sortBy: 'newest',
    searchTerm: '',
  },
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((p) => p._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cart.find((p) => p._id === productId);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cart');
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setCurrentProduct,
  setFilters,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} = productSlice.actions;
export default productSlice.reducer;
