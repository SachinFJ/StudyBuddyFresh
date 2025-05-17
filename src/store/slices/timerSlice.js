// timerSlice.js - टाइमर सेटिंग्स स्टेट

import { createSlice } from '@reduxjs/toolkit';

// प्रारंभिक टाइमर स्टेट
const initialState = {
  isActive: true, // टाइमर एक्टिव है या नहीं
  duration: 1800, // डिफ़ॉल्ट अवधि (30 मिनट = 1800 सेकंड)
  timeElapsed: 0, // बीता हुआ समय (सेकंड में)
  lastSetTime: null, // अंतिम बार सेट किया गया समय
  isUserSet: false, // यूजर ने सेट किया है या डिफ़ॉल्ट है
  lastSessionDuration: 0, // पिछले सत्र की अवधि
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    // टाइमर शुरू करें
    startTimer: (state) => {
      state.isActive = true;
      
      // यदि अंतिम बार सेट किया गया समय नहीं है, तो वर्तमान समय सेट करें
      if (!state.lastSetTime) {
        state.lastSetTime = new Date().toISOString();
      }
    },
    
    // टाइमर रोकें
    stopTimer: (state) => {
      state.isActive = false;
    },
    
    // टाइमर अवधि सेट करें
    setDuration: (state, action) => {
      state.duration = action.payload;
      state.isUserSet = true;
      state.timeElapsed = 0; // नई अवधि के लिए बीता हुआ समय रीसेट करें
      state.lastSetTime = new Date().toISOString();
    },
    
    // बीता हुआ समय अपडेट करें
    updateTimeElapsed: (state, action) => {
      state.timeElapsed = action.payload;
    },
    
    // बीता हुआ समय बढ़ाएँ
    incrementTimeElapsed: (state, action = { payload: 1 }) => {
      state.timeElapsed += action.payload;
    },
    
    // अंतिम बार सेट किया गया समय अपडेट करें
    updateLastSetTime: (state) => {
      state.lastSetTime = new Date().toISOString();
    },
    
    // पिछले सत्र की अवधि अपडेट करें
    setLastSessionDuration: (state, action) => {
      state.lastSessionDuration = action.payload;
    },
    
    // अंतिम सेशन का समय जोड़ें
    addToLastSessionDuration: (state, action) => {
      state.lastSessionDuration += action.payload;
    },
    
    // टाइमर रीसेट करें
    resetTimer: (state) => {
      state.timeElapsed = 0;
      state.lastSetTime = new Date().toISOString();
    },
    
    // डिफ़ॉल्ट सेटिंग्स पर टाइमर रीसेट करें
    resetToDefault: (state) => {
      state.isActive = true;
      state.duration = 1800;
      state.timeElapsed = 0;
      state.lastSetTime = new Date().toISOString();
      state.isUserSet = false;
    },
  },
});

// एक्शन्स और रिड्यूसर को एक्सपोर्ट करें
export const {
  startTimer,
  stopTimer,
  setDuration,
  updateTimeElapsed,
  incrementTimeElapsed,
  updateLastSetTime,
  setLastSessionDuration,
  addToLastSessionDuration,
  resetTimer,
  resetToDefault,
} = timerSlice.actions;

export default timerSlice.reducer;