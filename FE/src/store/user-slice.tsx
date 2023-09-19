import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/auth";
const userSlice = createSlice({
  name: "user",
  initialState: {
    auth: {
      isLogined: true,
    },
    info: {
      memberId: "1",
      loginId: "ungse0",
      token: "asdfadsfadfasfsafa", // 임시용
      name: "김웅서",
      email: "ungseo@gmail.com",
      phoneNumber: "010-9402-3393",
      point: 123456,
      profile: "/americano.png",
      address: "",
      role: "INDIVIDUAL",
      createDate: "2023-10-09",
      modifiedDate: "2023-10-09",
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
      localStorage.setItem("Atoken", "");
      localStorage.setItem("Rtoken", "");
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
