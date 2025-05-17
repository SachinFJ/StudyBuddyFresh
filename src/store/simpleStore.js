import { createSlice, configureStore } from '@reduxjs/toolkit';

// एक सरल स्लाइस
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// स्लाइस से एक्शन्स एक्सपोर्ट करें
export const { increment, decrement } = counterSlice.actions;

// स्टोर कॉन्फिगर करें
const simpleStore = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default simpleStore;