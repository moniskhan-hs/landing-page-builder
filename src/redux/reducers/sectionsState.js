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
        addMultipleFromSectionState: (state, action) => {
            state = state.push(action.payload)
            console.log('state:', state)

        },

        addLabel: (state, action) => {
            const {id, title, labelValue } = action.payload;
            console.log('title:', title)
            console.log('labelValue:', labelValue)
            const matchComponent = state.find((ele) => ele.title == title && ele.id === id)
            console.log('matchComponent:', matchComponent)

            if (matchComponent) {
                matchComponent.label = labelValue
            }
        },
        
        removeComponentFromSection : (state, action) => {
            const id = action.payload;
            return state.filter((ele) => ele.id !== id);
        }
}


})

export const {removeComponentFromSection, changeInSectionState,addLabel,addMultipleFromSectionState} = sectionStateReducer.actions