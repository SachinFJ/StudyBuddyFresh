import { createSlice } from '@reduxjs/toolkit';

// इनिशियल स्टेट
const initialState = {
  allSubjects: {
    'book1': [
      { id: 'subject1', name: 'राष्ट्रीय', nameEn: 'National', icon: '🏆' },
      { id: 'subject2', name: 'अंतर्राष्ट्रीय', nameEn: 'International', icon: '🌐' },
      { id: 'subject3', name: 'खेल', nameEn: 'Sports', icon: '⚽' },
      { id: 'subject4', name: 'पुरस्कार', nameEn: 'Awards', icon: '🏅' },
    ],
    'book2': [
      { id: 'subject5', name: 'प्राचीन काल', nameEn: 'Ancient Period', icon: '🗿' },
      { id: 'subject6', name: 'मध्यकाल', nameEn: 'Medieval Period', icon: '⚔️' },
      { id: 'subject7', name: 'आधुनिक काल', nameEn: 'Modern Period', icon: '🚂' },
    ],
    'book3': [
      { id: 'subject8', name: 'भारतीय भूगोल', nameEn: 'Indian Geography', icon: '🗺️' },
      { id: 'subject9', name: 'विश्व भूगोल', nameEn: 'World Geography', icon: '🌎' },
    ],
    'book4': [
      { id: 'subject10', name: 'भौतिक विज्ञान', nameEn: 'Physics', icon: '⚛️' },
      { id: 'subject11', name: 'रसायन विज्ञान', nameEn: 'Chemistry', icon: '⚗️' },
      { id: 'subject12', name: 'जीव विज्ञान', nameEn: 'Biology', icon: '🧬' },
    ]
  },
  selectedSubject: null
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    // विषय का चयन करने के लिए एक्शन
    selectSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },
    // विषय चयन रीसेट करने के लिए एक्शन
    resetSubjectSelection: (state) => {
      state.selectedSubject = null;
    }
  }
});

// एक्शन्स एक्सपोर्ट करें
export const { selectSubject, resetSubjectSelection } = subjectsSlice.actions;

// रिड्यूसर एक्सपोर्ट करें
export default subjectsSlice.reducer;