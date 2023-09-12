import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    focusOnSearchButton: false,
  },
  reducers: {
    //함수 작성
    searchButtonFocusedToggler(state) {
      state.focusOnSearchButton = !state.focusOnSearchButton;
    },
  },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
