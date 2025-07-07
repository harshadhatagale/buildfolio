// features/portfolio/portfolioSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSection: null,
  past: [],
  present: [],
  future: [],
  theme: 'light',
  title: "",
  isPublished: false
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setSections: (state, action) => {
      state.present = action.payload;
      state.past = [];
      state.future = [];
    },
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
    },
    addSection: (state, action) => {
      state.past.push([...state.present]);
      state.present.push(action.payload);
      state.future = [];
    },
    removeSection: (state, action) => {
      state.past.push([...state.present]);
      state.present = state.present.filter(
        (section) => section._id !== action.payload
      );
      state.future = [];
    },
    updateSection: (state, action) => {
      const { _id, content } = action.payload;
      state.past.push([...state.present]);
      const index = state.present.findIndex(
        (section) => section._id === _id
      );
      if (index !== -1) {
        state.present[index].content = { ...state.present.content, ...content }
        state.future = [];
      }
    },
    renameSection: (state, action) => {
      const { _id, name } = action.payload;
      state.past.push([...state.present]);
      const index = state.present.findIndex(
        (section) => section._id === _id
      );
      if (index !== -1) {
        state.present[index].name =  name 
        state.future = [];
      }
    },
    undo: (state) => {
      if (state.past.length > 0) {
        const previous = state.past[state.past.length - 1];
        state.future.unshift([...state.present]);
        state.present = previous;
        state.past.pop();
        state.selectedSection = null;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const next = state.future[0];
        state.past.push([...state.present]);
        state.present = next;
        state.future.shift();
        state.selectedSection = null;
      }
    }
  }
});

export const {
  addSection,
  removeSection,
  setSections,
  setSelectedSection,
  updateSection,
  renameSection,
  undo,
  redo
} = portfolioSlice.actions;

export default portfolioSlice.reducer;