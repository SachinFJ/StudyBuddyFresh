import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import subjectsReducer from './slices/subjectsSlice';
import topicsReducer from './slices/topicsSlice';
import languageReducer from './slices/languageSlice';
import progressReducer from './slices/progressSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    subjects: subjectsReducer,
    topics: topicsReducer,
    language: languageReducer,
    progress: progressReducer,
  },
});

export default store;