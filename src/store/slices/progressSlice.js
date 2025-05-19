import { createSlice } from '@reduxjs/toolkit';

// इनिशियल स्टेट
const initialState = {
  quizActivity: [],
  onelinerActivity: [],
  miscActivity: []
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    // प्रगति अपडेट करने के लिए एक्शन
    updateProgress: (state, action) => {
      const { type, ...progressData } = action.payload;
      const timestamp = new Date().toISOString();
      
      if (type === 'quiz') {
        state.quizActivity.push({
          ...progressData,
          date: timestamp
        });
      } else if (type === 'oneliner') {
        state.onelinerActivity.push({
          ...progressData,
          date: timestamp
        });
      } else if (type === 'misc') {
        state.miscActivity.push({
          ...progressData,
          date: timestamp
        });
      }
    },
    // सभी प्रगति क्लियर करने के लिए एक्शन
    clearProgress: (state) => {
      state.quizActivity = [];
      state.onelinerActivity = [];
      state.miscActivity = [];
    }
  }
});

// एक्शन्स एक्सपोर्ट करें
export const { updateProgress, clearProgress } = progressSlice.actions;

// रिड्यूसर एक्सपोर्ट करें
export default progressSlice.reducer;