import { createSlice } from "@reduxjs/toolkit";


const initialState = []



export const addMultiComponentReducer = createSlice({
    name: "addMultiComponentReducer",
    initialState,
    reducers: {
        addMultiple: (state, action) => {
            state = state.push(action.payload)
            console.log('state:', state)

        },
        changeInMultiState: (state, action) => {
            console.log('section state reducer called ')
            return action.payload
        },

        addLabelInMultiReducer: (state, action) => {
            const {id, title, labelValue } = action.payload;
            console.log('title:', title)
            console.log('labelValue:', labelValue)
            const matchComponent = state.find((ele) => ele.title == title && ele.id === id)
            console.log('matchComponent:', matchComponent)

            if (matchComponent) {
                matchComponent.label = labelValue
            }

        },

        removeComponent : (state, action) => {
            const id = action.payload;
            return state.filter((ele) => ele.id !== id);
        }


    }

})

export const {changeInMultiState, addMultiple, addLabelInMultiReducer,removeComponent } = addMultiComponentReducer.actions