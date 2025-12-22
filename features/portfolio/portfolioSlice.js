// features/portfolio/portfolioSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const defaultTheme = {
  light: {
    background: "oklch(1.00 0 0)",
    foreground: "oklch(0.14 0 0)",
    card: "oklch(1.00 0 0)",
    cardForeground: "oklch(0.14 0 0)",
    popover: "oklch(1.00 0 0)",
    popoverForeground: "oklch(0.14 0 0)",
    primary: "oklch(0.20 0 0)",
    primaryForeground: "oklch(0.99 0 0)",
    secondary: "oklch(0.97 0 0)",
    secondaryForeground: "oklch(0.20 0 0)",
    muted: "oklch(0.97 0 0)",
    mutedForeground: "oklch(0.56 0 0)",
    accent: "oklch(0.97 0 0)",
    accentForeground: "oklch(0.20 0 0)",
    destructive: "oklch(0.58 0.24 28.48)",
    border: "oklch(0.92 0 0)",
    input: "oklch(0.92 0 0)",
    ring: "oklch(0.71 0 0)",

    chart1: "oklch(0.65 0.22 36.85)",
    chart2: "oklch(0.60 0.11 184.15)",
    chart3: "oklch(0.40 0.07 227.18)",
    chart4: "oklch(0.83 0.17 81.03)",
    chart5: "oklch(0.77 0.17 65.36)",

    sidebar: "oklch(0.99 0 0)",
    sidebarForeground: "oklch(0.14 0 0)",
    sidebarPrimary: "oklch(0.20 0 0)",
    sidebarPrimaryForeground: "oklch(0.99 0 0)",
    sidebarAccent: "oklch(0.97 0 0)",
    sidebarAccentForeground: "oklch(0.20 0 0)",
    sidebarBorder: "oklch(0.92 0 0)",
    sidebarRing: "oklch(0.708 0 0)",

    radius: "0.625rem",
  },

  dark: {
    background: "oklch(0.14 0 0)",
    foreground: "oklch(0.99 0 0)",
    card: "oklch(0.20 0 0)",
    cardForeground: "oklch(0.99 0 0)",
    popover: "oklch(0.20 0 0)",
    popoverForeground: "oklch(0.99 0 0)",
    primary: "oklch(0.92 0 0)",
    primaryForeground: "oklch(0.20 0 0)",
    secondary: "oklch(0.27 0 0)",
    secondaryForeground: "oklch(0.99 0 0)",
    muted: "oklch(0.27 0 0)",
    mutedForeground: "oklch(0.71 0 0)",
    accent: "oklch(0.27 0 0)",
    accentForeground: "oklch(0.99 0 0)",
    destructive: "oklch(0.70 0.19 22.23)",
    border: "oklch(1.00 0 0 / 10%)",
    input: "oklch(1.00 0 0 / 15%)",
    ring: "oklch(0.56 0 0)",

    chart1: "oklch(0.49 0.24 264.40)",
    chart2: "oklch(0.70 0.16 160.43)",
    chart3: "oklch(0.77 0.17 65.36)",
    chart4: "oklch(0.62 0.26 305.32)",
    chart5: "oklch(0.64 0.25 16.51)",

    sidebar: "oklch(0.20 0 0)",
    sidebarForeground: "oklch(0.99 0 0)",
    sidebarPrimary: "oklch(0.49 0.24 264.40)",
    sidebarPrimaryForeground: "oklch(0.99 0 0)",
    sidebarAccent: "oklch(0.27 0 0)",
    sidebarAccentForeground: "oklch(0.99 0 0)",
    sidebarBorder: "oklch(1.00 0 0 / 10%)",
    sidebarRing: "oklch(0.56 0 0)",

    radius: "0.625rem",
  },
};




const initialState = {
  theme: defaultTheme,
  themeId: null,
  project: {},
  themeMode: 'light', 
  selectedSection: null,
  past: [],
  present: [],
  future: [],
  title: "",
  isPublished: false
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setProject:(state, action)=>{
      state.project= action.payload
    },
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
        state.present[index].content = {
          ...state.present[index].content,
          ...content
        };
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
        state.present[index].name = name;
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
    },
    setThemeColors: (state, action) => {
      const {colors}= action.payload
      state.theme = colors
    },
    setTheme: (state, action) => {
      const {id}= action.payload
      state.themeId= id
    }
  }
});

export const {
  setProject,
  addSection,
  removeSection,
  setSections,
  setThemeColors,
  setTheme,
  setSelectedSection,
  updateSection,
  renameSection,
  undo,
  redo
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
