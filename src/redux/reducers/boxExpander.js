// boxSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expandedBoxId: null,
};

export const boxExpandReducer = createSlice({
  name: 'boxExpandReducer',
  initialState,
  reducers: {
    setExpandedBoxId(state, action) {
      state.expandedBoxId = action.payload;
    },
  },
});

export const { setExpandedBoxId } = boxExpandReducer.actions;
