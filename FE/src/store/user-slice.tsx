import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    isLogined: false,
    accessToken: "",
    refreshToken: "",
  },
  info: {
    memberId: "1",
    loginId: "",
    name: "",
    email: "",
    phoneNumber: "",
    point: 0,
    profile: "",
    address: "",
    role: "",
    createDate: "",
    modifiedDate: "",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //함수 작성
    loginHandler(state, action) {
      state.auth.isLogined = true;
      state.auth.accessToken = action.payload.accessToken;
      state.auth.refreshToken = action.payload.refreshToken;
    },
    logoutHandler(state) {
      localStorage.removeItem("persist:root");
      console.log(state);
      return { ...initialState };
    },
    saveMemberInfo(state, action) {
      return { ...state, info: action.payload };
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
