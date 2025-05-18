import { createSlice } from '@reduxjs/toolkit';
import topicsData from '../../data/topicsData';

const initialState = {
  allTopics: topicsData.hindi,
  selectedTopic: null,
  currentSubjectTopics: [],
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setAllTopics: (state, action) => {
      state.allTopics = action.payload;
    },
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    setCurrentSubjectTopics: (state, action) => {
      const { bookId, subjectId } = action.payload;
      state.currentSubjectTopics = state.allTopics[bookId]?.[subjectId] || [];
    },
    clearSelectedTopic: (state) => {
      state.selectedTopic = null;
    },
  },
});

export const { 
  setAllTopics, 
  setSelectedTopic, 
  setCurrentSubjectTopics,
  clearSelectedTopic 
} = topicsSlice.actions;

export default topicsSlice.reducer;