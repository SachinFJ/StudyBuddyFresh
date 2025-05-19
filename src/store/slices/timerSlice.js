import { createSlice } from '@reduxjs/toolkit';

// इनिशियल स्टेट
const initialState = {
  isActive: true,
  duration: 1800, // 30 मिनट (सेकंड्स में)
  timeElapsed: 0,
  lastSetTime: new Date().toISOString(),
  isUserSet: false
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    // टाइमर अपडेट करने के लिए एक्शन
    updateTimer: (state) => {
      state.timeElapsed += 1;
      
      // अगर सेट की गई अवधि से टाइम एलैप्स्ड अधिक हो जाए, तो नोटिफिकेशन लॉजिक यहां जोड़ सकते हैं
    },
    // टाइमर सेट करने के लिए एक्शन
    setTimer: (state, action) => {
      state.duration = action.payload;
      state.lastSetTime = new Date().toISOString();
      state.isUserSet = true;
    },
    // टाइमर रीसेट करने के लिए एक्शन
    resetTimer: (state) => {
      state.timeElapsed = 0;
    },
    // टाइमर एक्टिव/इनएक्टिव करने के लिए एक्शन
    toggleTimerActive: (state) => {
      state.isActive = !state.isActive;
    }
  }
});

// एक्शन्स एक्सपोर्ट करें
export const { updateTimer, setTimer, resetTimer, toggleTimerActive } = timerSlice.actions;

// रिड्यूसर एक्सपोर्ट करें
export default timerSlice.reducer;