import axios from "axios";

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
