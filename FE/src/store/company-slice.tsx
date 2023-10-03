import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const initialState = {
  info: {
    companyId: "",
    loginId: "",
    profile: "",
    banner: "",
    name: "",
    hashtag: "",
    email: "",
    phoneNumber: "",
    address: "",
    registrationNumber: "",
    websiteUrl: "",
    introduce: "",
    createdDate: "",
    modifiedDate: "",
    point: 0,
  },
};
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    //함수 작성

    saveMemberInfo(state, action) {
      return { ...state, info: action.payload };
    },
  },
});

export default companySlice;
export const companyActions = companySlice.actions;
