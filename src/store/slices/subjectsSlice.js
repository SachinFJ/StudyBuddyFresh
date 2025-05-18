import { createSlice } from '@reduxjs/toolkit';
import subjectsData from '../../data/subjectsData';

const initialState = {
  allSubjects: subjectsData.hindi,
  selectedSubject: null,
  currentBookSubjects: [],
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    setAllSubjects: (state, action) => {
      state.allSubjects = action.payload;
    },
    setSelectedSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },
    setCurrentBookSubjects: (state, action) => {
      const bookId = action.payload;
      state.currentBookSubjects = state.allSubjects[bookId] || [];
    },
    clearSelectedSubject: (state) => {
      state.selectedSubject = null;
    },
  },
});

export const { 
  setAllSubjects, 
  setSelectedSubject, 
  setCurrentBookSubjects,
  clearSelectedSubject 
} = subjectsSlice.actions;

export default subjectsSlice.reducer;