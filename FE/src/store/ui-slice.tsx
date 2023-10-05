import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isEditPage: false,
    reportModal: false,
    alarmCount: 0,
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
    changeAlarmCount(state, action) {
      state.alarmCount = action.payload;
    },
  },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
