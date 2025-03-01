import { createSlice } from "@reduxjs/toolkit";


const initialState = [
    {
        title: "HERO",
        isSelected: false,
        label: 'Home'

    },
    {
        title: "SERVICES",
        isSelected: false,
        label: ''
    },

    {
        title: "TESTIMONIALS",
        isSelected: false,
        label: ''
    },
    {
        title: "BENEFITS",
        isSelected: false,
        label: ''
    },
    {
        title: "INCLUDED / NOT-INCLUDED",
        isSelected: false,
        label: ''
    },
    {
        title: "ABOUT US",
        isSelected: false,
        label: ''
    },
    {
        title: "FORM",
        isSelected: false,
        label: ''
    },
    {
        title: "FAQ",
        isSelected: false,
        label: ''
    },
    {
        title: "CALL TO ACTION",
        isSelected: false,
        label: ''
    },


]


export const sidebarMunuReducer = createSlice({
    name: "sidebarMenuReducer",
    initialState,
    reducers: {

        toggleIsSelected: (state, action) => {
            const componentName = action.payload;
            const menuItem = state.find((ele) => ele.title == componentName)
            if (menuItem) {
                menuItem.isSelected = !menuItem.isSelected
            }

        },

        selecteMultiple: (state, action) => {
            const newComponent = { title: `${action.payload}`, isSelected: true, label: '' }
            state = { ...state, newComponent }
            console.log('state:', state)

        }

    }
})

export const { toggleIsSelected,selecteMultiple } = sidebarMunuReducer.actions