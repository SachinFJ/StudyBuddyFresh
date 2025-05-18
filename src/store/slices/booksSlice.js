import { createSlice } from '@reduxjs/toolkit';
import booksData from '../../data/booksData';

const initialState = {
  allBooks: booksData.hindi,
  selectedBook: null,
  filteredBooks: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setAllBooks: (state, action) => {
      state.allBooks = action.payload;
    },
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    filterBooks: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredBooks = state.allBooks.filter(book => 
        book.name.toLowerCase().includes(searchTerm)
      );
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
});

export const { setAllBooks, setSelectedBook, filterBooks, clearSelectedBook } = booksSlice.actions;
export default booksSlice.reducer;