import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/auth";
const memberInfo = {
  memberId: "",
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
};
const userSlice = createSlice({
  name: "user",
  initialState: {
    auth: {
      isLogined: false,
    },
    info: {
      ...memberInfo,
    },
  },
  reducers: {
    //함수 작성
    loginHandler(state, action) {
      state.auth.isLogined = true;
      localStorage.setItem("Atoken", action.payload.accessToken);
      localStorage.setItem("Rtoken", action.payload.refreshToken);
    },
    logoutHandler(state) {
      state.auth.isLogined = false;
      localStorage.removeItem("Atoken");
      localStorage.removeItem("Rtoken");
    },
    saveMemberInfo(state, action) {
      state.info = { ...memberInfo, ...action.payload };
      state.auth.isLogined = true;
      console.log(state.info);
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
