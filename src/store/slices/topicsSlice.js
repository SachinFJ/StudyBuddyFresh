// topicsSlice.js - टॉपिक संबंधित स्टेट

import { createSlice } from '@reduxjs/toolkit';

// प्रारंभिक टॉपिक डेटा
const initialState = {
  allTopics: {
    book1: [
      { id: 'topic1', name: 'इतिहास', nameEn: 'History', iconName: 'time-outline' },
      { id: 'topic2', name: 'भूगोल', nameEn: 'Geography', iconName: 'globe-outline' },
      // अन्य टॉपिक्स भविष्य में जोड़े जा सकते हैं
    ],
    book2: [
      { id: 'topic1', name: 'भौतिकी', nameEn: 'Physics', iconName: 'flash-outline' },
      { id: 'topic2', name: 'रसायन विज्ञान', nameEn: 'Chemistry', iconName: 'flask-outline' },
      // अन्य टॉपिक्स भविष्य में जोड़े जा सकते हैं
    ],
  },
  selectedTopic: null,
};

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    // चयनित टॉपिक सेट करें
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    
    // किसी पुस्तक के लिए टॉपिक्स जोड़ें
    addTopicsForBook: (state, action) => {
      const { bookId, topics } = action.payload;
      
      // यदि पुस्तक पहले से मौजूद है, तो टॉपिक्स अपडेट करें, अन्यथा नए टॉपिक्स जोड़ें
      if (state.allTopics[bookId]) {
        state.allTopics[bookId] = [...state.allTopics[bookId], ...topics];
      } else {
        state.allTopics[bookId] = topics;
      }
    },
    
    // किसी पुस्तक के लिए सभी टॉपिक्स सेट करें
    setTopicsForBook: (state, action) => {
      const { bookId, topics } = action.payload;
      state.allTopics[bookId] = topics;
    },
    
    // एक नया टॉपिक जोड़ें
    addTopic: (state, action) => {
      const { bookId, topic } = action.payload;
      
      if (state.allTopics[bookId]) {
        state.allTopics[bookId].push(topic);
      } else {
        state.allTopics[bookId] = [topic];
      }
    },
    
    // टॉपिक अपडेट करें
    updateTopic: (state, action) => {
      const { bookId, topicId, updatedData } = action.payload;
      
      if (state.allTopics[bookId]) {
        const topicIndex = state.allTopics[bookId].findIndex(
          topic => topic.id === topicId
        );
        
        if (topicIndex !== -1) {
          state.allTopics[bookId][topicIndex] = {
            ...state.allTopics[bookId][topicIndex],
            ...updatedData,
          };
          
          // यदि चयनित टॉपिक अपडेट हुआ है, तो उसे भी अपडेट करें
          if (
            state.selectedTopic &&
            state.selectedTopic.id === topicId &&
            state.selectedTopic.bookId === bookId
          ) {
            state.selectedTopic = {
              ...state.selectedTopic,
              ...updatedData,
            };
          }
        }
      }
    },
    
    // टॉपिक हटाएँ
    removeTopic: (state, action) => {
      const { bookId, topicId } = action.payload;
      
      if (state.allTopics[bookId]) {
        state.allTopics[bookId] = state.allTopics[bookId].filter(
          topic => topic.id !== topicId
        );
        
        // यदि हटाया गया टॉपिक चयनित है, तो चयनित टॉपिक को null सेट करें
        if (
          state.selectedTopic &&
          state.selectedTopic.id === topicId &&
          state.selectedTopic.bookId === bookId
        ) {
          state.selectedTopic = null;
        }
      }
    },
    
    // चयनित टॉपिक को साफ़ करें
    clearSelectedTopic: (state) => {
      state.selectedTopic = null;
    },
    
    // सभी टॉपिक्स सेट करें
    setAllTopics: (state, action) => {
      state.allTopics = action.payload;
    },
  },
});

// एक्शन्स और रिड्यूसर को एक्सपोर्ट करें
export const {
  setSelectedTopic,
  addTopicsForBook,
  setTopicsForBook,
  addTopic,
  updateTopic,
  removeTopic,
  clearSelectedTopic,
  setAllTopics,
} = topicsSlice.actions;

export default topicsSlice.reducer;