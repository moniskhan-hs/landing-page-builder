import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:null,
    name:''

}

export const selectedComponentReducer =  createSlice({
    name:"selectedComponentReducer",
    initialState,
    reducers:{
        addSelectedComponent : (state,action)=>{
           const {id,name} = action.payload;
           state.id=id,
           state.name=name
        }
    }
})

export const {addSelectedComponent} = selectedComponentReducer.actions