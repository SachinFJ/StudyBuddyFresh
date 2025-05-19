import { createSlice } from '@reduxjs/toolkit';

// इनिशियल स्टेट
const initialState = {
  allTopics: {
    'subject1': [
      { id: 'topic1', name: 'राष्ट्रीय प्रतीक', nameEn: 'National Symbols', icon: '🏛️' },
      { id: 'topic2', name: 'संविधान', nameEn: 'Constitution', icon: '📜' },
    ],
    'subject2': [
      { id: 'topic3', name: 'संयुक्त राष्ट्र', nameEn: 'United Nations', icon: '🇺🇳' },
      { id: 'topic4', name: 'अंतर्राष्ट्रीय संगठन', nameEn: 'International Organizations', icon: '🌐' },
    ],
    'subject3': [
      { id: 'topic5', name: 'क्रिकेट', nameEn: 'Cricket', icon: '🏏' },
      { id: 'topic6', name: 'ओलंपिक', nameEn: 'Olympics', icon: '🥇' },
    ],
    'subject5': [
      { id: 'topic7', name: 'सिंधु घाटी सभ्यता', nameEn: 'Indus Valley Civilization', icon: '🏺' },
      { id: 'topic8', name: 'वैदिक काल', nameEn: 'Vedic Period', icon: '📚' },
    ],
    'subject8': [
      { id: 'topic9', name: 'राज्य', nameEn: 'States', icon: '🗺️' },
      { id: 'topic10', name: 'नदियाँ', nameEn: 'Rivers', icon: '🏞️' },
    ],
    'subject10': [
      { id: 'topic11', name: 'गति', nameEn: 'Motion', icon: '🚀' },
      { id: 'topic12', name: 'ऊर्जा', nameEn: 'Energy', icon: '⚡' },
    ],
  },
  selectedTopic: null
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    // टॉपिक का चयन करने के लिए एक्शन
    selectTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    // टॉपिक चयन रीसेट करने के लिए एक्शन
    resetTopicSelection: (state) => {
      state.selectedTopic = null;
    }
  }
});

// एक्शन्स एक्सपोर्ट करें
export const { selectTopic, resetTopicSelection } = topicsSlice.actions;

// रिड्यूसर एक्सपोर्ट करें
export default topicsSlice.reducer;