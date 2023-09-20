import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    isCheckedAll: false,
    isCheckedList: [] as boolean[],
  },
  reducers: {
    handleCheckboxChangeAll(state) {
      state.isCheckedAll = !state.isCheckedAll;
      state.isCheckedList = state.isCheckedList.map(() => state.isCheckedAll);
    },
    handleCheckboxChangeSingle(state, action) {
      const index = action.payload;
      state.isCheckedList[index] = !state.isCheckedList[index];
      state.isCheckedAll = state.isCheckedList.every((isChecked) => isChecked);
    },
    initializeIsCheckedList(state, action) {
      state.isCheckedList = new Array(action.payload).fill(false);
    },
  },
});

export default messageSlice;
export const messageSliceActions = messageSlice.actions;
