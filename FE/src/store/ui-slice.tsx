import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isEditPage: false,
    reportModal: false,
  },
  reducers: {
    //함수 작성
    notInEditPage(state) {
      state.isEditPage = false;
    },
    inEditPage(state) {
      state.isEditPage = true;
    },
    changeReportModal(state) {
      state.reportModal = !state.reportModal;
    },
  },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
