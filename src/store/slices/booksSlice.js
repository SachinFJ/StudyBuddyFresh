import { createSlice } from '@reduxjs/toolkit';

// Sample data structure
const initialBookData = [
  {
    id: 'book1',
    name: 'सामान्य ज्ञान',
    category: 'general',
  },
  {
    id: 'book2',
    name: 'भारतीय इतिहास',
    category: 'history',
  },
  {
    id: 'book3',
    name: 'भूगोल',
    category: 'geography',
  },
  {
    id: 'book4',
    name: 'विज्ञान',
    category: 'science',
  },
];

// Initial state structure
const initialState = {
  allBooks: initialBookData,
  selectedBook: null, // Initialize as null - will be set when user selects a book
  filteredBooks: [],
  error: null,
  loading: false,
};

// Create the slice
const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // Select a book by ID
    selectBook: (state, action) => {
      const bookId = action.payload;
      const foundBook = state.allBooks.find(book => book.id === bookId);
      
      if (foundBook) {
        state.selectedBook = foundBook;
        state.error = null;
      } else {
        state.error = `Book with ID ${bookId} not found`;
      }
    },
    
    // Clear selected book
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
    
    // Filter books by category or name
    filterBooks: (state, action) => {
      const filter = action.payload.toLowerCase();
      state.filteredBooks = state.allBooks.filter(book => 
        book.name.toLowerCase().includes(filter) || 
        book.category.toLowerCase().includes(filter)
      );
    },
    
    // Clear filters
    clearFilters: (state) => {
      state.filteredBooks = [];
    },
    
    // Add a new book (for admin features if needed later)
    addBook: (state, action) => {
      state.allBooks.push(action.payload);
    },
  },
});

// Export actions
export const { 
  selectBook, 
  clearSelectedBook, 
  filterBooks, 
  clearFilters,
  addBook 
} = booksSlice.actions;

// Export reducer
export default booksSlice.reducer;