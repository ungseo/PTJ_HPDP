import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/auth";
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogined: true,
    userId: "1",
    token: "asdfadsfadfasfsafa",
  },
  reducers: {
    //함수 작성
    loginHandler(state, action) {
      login(
        action.payload.type,
        action.payload,
        (res) => {
          state.isLogined = true;
          state.userId = res.data.data.userId;
        },
        (err) => {
          console.log(action.payload, err);
        }
      );
    },
    logoutHandler(state) {
      state.isLogined = false;
      state.token = "";
      state.userId = "";
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
