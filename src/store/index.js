import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import languageReducer from './slices/languageSlice';
import progressReducer from './slices/progressSlice';

/**
 * Redux स्टोर कॉन्फिगरेशन
 * यहां सभी reducers को एक जगह combine किया जाता है
 */
const store = configureStore({
  reducer: {
    books: booksReducer,
    language: languageReducer,
    progress: progressReducer,
  },
});

export default store;