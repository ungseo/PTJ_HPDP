import { createSlice } from "@reduxjs/toolkit";

const transHistorySlice = createSlice({
  name: "transHistory",
  initialState: {
    isInsert: true,
  },
  reducers: {
    //함수 작성
    insertSwitchHandler(state) {
      state.isInsert = !state.isInsert;
    },
  },
});

export default transHistorySlice;
export const transHistoryActions = transHistorySlice.actions;
