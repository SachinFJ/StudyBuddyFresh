import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: 'hindi', // डिफॉल्ट भाषा - hindi या english
  available: ['hindi', 'english'],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    // भाषा परिवर्तन करने के लिए
    setLanguage: (state, action) => {
      const newLanguage = action.payload;
      if (state.available.includes(newLanguage)) {
        state.current = newLanguage;
      }
    },
    
    // हिंदी और अंग्रेजी के बीच टॉगल करने के लिए
    toggleLanguage: (state) => {
      state.current = state.current === 'hindi' ? 'english' : 'hindi';
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer;