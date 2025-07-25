// features/portfolio/portfolioSlice.js
import { createSlice } from "@reduxjs/toolkit";

const defaultTheme = {
  light: {
    background: "oklch(0.99 0 0)",
    foreground: "oklch(0.35 0.02 165.48)",
    card: "oklch(1.00 0 0)",
    cardForeground: "oklch(0.35 0.02 165.48)",
    popover: "oklch(1.00 0 0)",
    popoverForeground: "oklch(0.35 0.02 165.48)",
    primary: "oklch(0.67 0.17 153.85)",
    primaryForeground: "oklch(0.99 0.02 175.22)",
    secondary: "oklch(0.90 0.02 238.66)",
    secondaryForeground: "oklch(0.20 0.02 266.02)",
    muted: "oklch(0.90 0.02 240.73)",
    mutedForeground: "oklch(0.50 0.03 268.53)",
    accent: "oklch(0.90 0.02 240.73)",
    accentForeground: "oklch(0.35 0.02 165.48)",
    destructive: "oklch(0.61 0.24 20.96)",
    border: "oklch(0.94 0.01 238.46)",
    input: "oklch(0.85 0.02 240.75)",
    ring: "oklch(0.67 0.17 153.85)",
    chart1: "oklch(0.67 0.17 153.85)",
    chart2: "oklch(0.50 0.10 270.06)",
    chart3: "oklch(0.72 0.12 201.79)",
    chart4: "oklch(0.80 0.10 100.65)",
    chart5: "oklch(0.60 0.15 300.14)",
    sidebar: "oklch(0.98 0.01 238.45)",
    sidebarForeground: "oklch(0.35 0.02 165.48)",
    sidebarPrimary: "oklch(0.67 0.17 153.85)",
    sidebarPrimaryForeground: "oklch(0.98 0.01 238.45)",
    sidebarAccent: "oklch(0.90 0.02 240.73)",
    sidebarAccentForeground: "oklch(0.35 0.02 165.48)",
    sidebarBorder: "oklch(0.85 0.02 240.75)",
    sidebarRing: "oklch(0.67 0.17 153.85)",
    radius: "0.25rem",
  },
  dark: {
    background: "oklch(0.15 0.02 269.18)",
    foreground: "oklch(0.95 0.01 238.46)",
    card: "oklch(0.20 0.02 266.02)",
    cardForeground: "oklch(0.95 0.01 238.46)",
    popover: "oklch(0.20 0.02 266.02)",
    popoverForeground: "oklch(0.95 0.01 238.46)",
    primary: "oklch(0.67 0.17 153.85)",
    primaryForeground: "oklch(0.15 0.02 269.18)",
    secondary: "oklch(0.30 0.03 271.05)",
    secondaryForeground: "oklch(0.95 0.01 238.46)",
    muted: "oklch(0.30 0.03 271.05)",
    mutedForeground: "oklch(0.60 0.03 269.46)",
    accent: "oklch(0.30 0.03 271.05)",
    accentForeground: "oklch(0.95 0.01 238.46)",
    destructive: "oklch(0.64 0.25 19.69)",
    border: "oklch(0.95 0.01 238.46 / 15%)",
    input: "oklch(0.95 0.01 238.46 / 20%)",
    ring: "oklch(0.67 0.17 153.85)",
    chart1: "oklch(0.67 0.17 153.85)",
    chart2: "oklch(0.60 0.10 269.83)",
    chart3: "oklch(0.72 0.12 201.79)",
    chart4: "oklch(0.80 0.10 100.65)",
    chart5: "oklch(0.60 0.15 300.14)",
    sidebar: "oklch(0.20 0.02 266.02)",
    sidebarForeground: "oklch(0.95 0.01 238.46)",
    sidebarPrimary: "oklch(0.67 0.17 153.85)",
    sidebarPrimaryForeground: "oklch(0.15 0.02 269.18)",
    sidebarAccent: "oklch(0.30 0.03 271.05)",
    sidebarAccentForeground: "oklch(0.95 0.01 238.46)",
    sidebarBorder: "oklch(0.95 0.01 238.46 / 15%)",
    sidebarRing: "oklch(0.67 0.17 153.85)",
    radius: "0.25rem",
  }
};



const initialState = {
  theme: defaultTheme,
  themeMode: 'light', // renamed to avoid conflict
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
    setTheme: (state, action) => {
      state.theme = action.payload
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
