import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sections: [],
    theme: 'light',
    title: "",
    isPublished: false
}


export const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        setSections: (state, action) => {
            state.sections = action.payload
        },
        addSection: (state, action) => {
            state.sections.push(action.payload)
        },
        removeSection: (state, action) => {
            state.sections = state.sections.filter(
                (section) => section.id !== action.payload
            )
        },
        updateSection: (state, action) => {
            const index = state.sections.findIndex(
                (section) => section.id === action.payload.id
            )
            if (index !== -1) {
                state.sections[index] = action.payload
            }
        }
    }
})

export const { addSection, removeSection, setSections, updateSection } = portfolioSlice.actions
export default portfolioSlice.reducer