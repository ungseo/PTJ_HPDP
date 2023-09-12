import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "ui",
  initialState: {
    isLogined: true,
    userId: "",
    token: "",
  },
  reducers: {
    //함수 작성
    loginHandler(state, action) {
      state.isLogined = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logoutHandler(state) {
      state.isLogined = false;
      state.token = "";
      state.userId = "";
    },
  },
});

export default userSlice;
export const uiActions = userSlice.actions;
