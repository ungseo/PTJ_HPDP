import { createSlice } from "@reduxjs/toolkit";
const profileEditSlice = createSlice({
  name: "transHistory",
  initialState: {
    fileURL: null,
    name: "",
    phoneNumber: "",
    email: "",
  },
  reducers: {
    //함수 작성
    changeFile(state, action) {
      return { ...state, fileURL: action.payload };
    },
  },
});

export default profileEditSlice;
export const profileEditActions = profileEditSlice.actions;
