import axios from "axios";

const refreshToken = () => {
  const storage = sessionStorage.getItem("persist:root");
  if (storage) {
    const parsedData = JSON.parse(storage);
    const userData = JSON.parse(parsedData.user);
    const data = {
      accessToken: userData.auth.accessToken,
      refreshToken: userData.auth.refreshToken,
    };
    console.log(data);
    return customApi("auth")
      .post("/regenerate", data)
      .then((response) => {
        console.log("재발행성공", response.data);
        return response.headers.accessToken;
      })
      .catch((error) => console.log("재발행실패"));
  }
};

//
export const customApi = (baseURL: string) => {
  const Api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/${baseURL}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  Api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // 만료된 토큰으로 요청이 실패한 경우
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // 토큰을 재발급하고 재시도
        const newToken = await refreshToken(); // refreshToken 함수 구현 필요
        Api.defaults.headers["accessToken"] = `Bearer ${newToken}`;
        return Api(originalRequest);
      } else {
      }
      return Promise.reject(error);
    }
  );
  return Api;
};

export const customApiForm = (baseURL: string) => {
  const Api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/${baseURL}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  Api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // 만료된 토큰으로 요청이 실패한 경우
      if (error.response.status === 401 && !originalRequest._retry) {
        // originalRequest._retry = true;
        // 토큰을 재발급하고 재시도
        const newToken = await refreshToken(); // refreshToken 함수 구현 필요
        Api.defaults.headers["accessToken"] = `Bearer ${newToken}`;
        return Api(originalRequest);
      } else {
      }
      return Promise.reject(error);
    }
  );
  return Api;
};
