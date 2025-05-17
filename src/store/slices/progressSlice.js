import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizActivity: [],
  onelinerActivity: [],
  miscActivity: [],
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    // क्विज़ प्रगति रिकॉर्ड करने के लिए
    recordQuizActivity: (state, action) => {
      state.quizActivity.push({
        ...action.payload,
        date: new Date().toISOString(),
      });
    },
    
    // वनलाइनर प्रगति रिकॉर्ड करने के लिए
    recordOnelinerActivity: (state, action) => {
      state.onelinerActivity.push({
        ...action.payload,
        date: new Date().toISOString(),
      });
    },
    
    // मिश्रित प्रश्नों की प्रगति रिकॉर्ड करने के लिए
    recordMiscActivity: (state, action) => {
      state.miscActivity.push({
        ...action.payload,
        date: new Date().toISOString(),
      });
    },
    
    // किसी विशेष प्रकार की प्रगति को साफ़ करने के लिए
    clearActivityHistory: (state, action) => {
      const { activityType } = action.payload;
      
      switch (activityType) {
        case 'quiz':
          state.quizActivity = [];
          break;
        case 'oneliner':
          state.onelinerActivity = [];
          break;
        case 'misc':
          state.miscActivity = [];
          break;
        case 'all':
          state.quizActivity = [];
          state.onelinerActivity = [];
          state.miscActivity = [];
          break;
        default:
          break;
      }
    },
  },
});

export const { 
  recordQuizActivity, 
  recordOnelinerActivity, 
  recordMiscActivity,
  clearActivityHistory 
} = progressSlice.actions;

export default progressSlice.reducer;