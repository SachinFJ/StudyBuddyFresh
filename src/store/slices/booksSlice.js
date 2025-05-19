import { createSlice } from '@reduxjs/toolkit';

// इनिशियल स्टेट
const initialState = {
  allBooks: [
    { id: 'book1', name: 'सामान्य ज्ञान', nameEn: 'General Knowledge', color: '#003049', icon: '🧠' },
    { id: 'book2', name: 'भारतीय इतिहास', nameEn: 'Indian History', color: '#C1121F', icon: '🏛️' },
    { id: 'book3', name: 'भूगोल', nameEn: 'Geography', color: '#669BBC', icon: '🌍' },
    { id: 'book4', name: 'विज्ञान', nameEn: 'Science', color: '#780000', icon: '🔬' },
  ],
  selectedBook: null,
  filteredBooks: []
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // पुस्तक का चयन करने के लिए एक्शन
    selectBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    // पुस्तकों को फ़िल्टर करने के लिए एक्शन
    filterBooks: (state, action) => {
      const query = action.payload.toLowerCase();
      if (!query) {
        state.filteredBooks = [];
      } else {
        state.filteredBooks = state.allBooks.filter(book => 
          book.name.toLowerCase().includes(query) || 
          (book.nameEn && book.nameEn.toLowerCase().includes(query))
        );
      }
    },
    // पुस्तक चयन रीसेट करने के लिए एक्शन
    resetBookSelection: (state) => {
      state.selectedBook = null;
    }
  }
});

// एक्शन्स एक्सपोर्ट करें
export const { selectBook, filterBooks, resetBookSelection } = booksSlice.actions;

// रिड्यूसर एक्सपोर्ट करें
export default booksSlice.reducer;