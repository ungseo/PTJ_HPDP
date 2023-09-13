import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isEditPage: false,
  },
  reducers: {
    //함수 작성
    notInEditPage(state) {
      state.isEditPage = false;
    },
    inEditPage(state) {
      state.isEditPage = true;
    },
  },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
