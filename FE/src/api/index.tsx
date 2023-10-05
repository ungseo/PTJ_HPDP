import axios from "axios";
import { userActions } from "../store/user-slice";
import { Dispatch } from "redux";

//
export const customApi = (baseURL: string) => {
  const Api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/${baseURL}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return Api;
};
export const customApiForm = (baseURL: string) => {
  const Api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/${baseURL}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return Api;
};
