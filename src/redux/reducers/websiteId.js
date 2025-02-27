import { createSlice } from "@reduxjs/toolkit";

const initialState={
    generatedWebsiteId:null
}

export const websiteIdReducer = createSlice({
    name:'websiteIdReducer',
    initialState,
    reducers:{
        setGeneratedWebsiteId :(state,action)=>{
            state.generatedWebsiteId = action.payload
        }
    }
})

export const {setGeneratedWebsiteId} = websiteIdReducer.actions