import { createSlice } from "@reduxjs/toolkit";
const initialState = [
]

export const sectionStateReducer = createSlice({
    name: "sectionStateReducer",
    initialState,
    reducers: {
        changeInSectionState: (state, action) => {
            console.log('section state reducer called ')
            return action.payload

        },
}


})

export const { changeInSectionState} = sectionStateReducer.actions