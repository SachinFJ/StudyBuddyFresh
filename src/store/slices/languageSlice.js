import { createSlice } from '@reduxjs/toolkit';

// इनिशियल स्टेट
const initialState = {
  current: 'hindi', // 'hindi' या 'english'
  available: ['hindi', 'english']
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    // भाषा टॉगल करने के लिए एक्शन
    toggleLanguage: (state) => {
      state.current = state.current === 'hindi' ? 'english' : 'hindi';
    },
    // विशिष्ट भाषा सेट करने के लिए एक्शन
    setLanguage: (state, action) => {
      if (state.available.includes(action.payload)) {
        state.current = action.payload;
      }
    }
  }
});

// एक्शन्स एक्सपोर्ट करें
export const { toggleLanguage, setLanguage } = languageSlice.actions;

// रिड्यूसर एक्सपोर्ट करें
export default languageSlice.reducer;