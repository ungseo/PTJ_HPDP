import axios from "axios";
import { userActions } from "../store/user-slice";
import { Dispatch } from "redux";

const refreshToken = () => {
  const storage = sessionStorage.getItem("persist:root");
  if (storage) {
    const parsedData = JSON.parse(storage);
    const userData = JSON.parse(parsedData.user);
    //만료된토큰
    const data = {
      accessToken: userData.auth.accessToken,
      refreshToken: userData.auth.refreshToken,
    };
    //axios 리제너레이트 (재발급)
    const newToken = async () =>
      await axios
        .post(`${process.env.REACT_APP_API_URL}/auth/regenerate`, data)
        .then((res) => {
          const data = {
            accessToken: res.headers.accessToken,
            refreshToken: res.headers.refreshToken,
          };
          console.log(data, "재발급된 토큰값");
          // 토큰 재발급받은걸 리덕스에 저장
          const saveTokens =
            (tokenData: { accessToken: string; refreshToken: string }) =>
            async (dispatch: Dispatch) => {
              try {
                // 비동기 작업 수행
                // tokenData를 사용하여 액션 생성
                dispatch(userActions.updateTokens(tokenData));
              } catch (error) {
                // 에러 처리
                console.error("토큰 업데이트 오류:", error);
              }
            };
          saveTokens(data);
          return data.accessToken;
        })
        .catch((err) => {
          console.log("alert", err);
          return null;
        });
    return newToken;
  }
  return;
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
        const newToken = await refreshToken();
        if (newToken) {
          Api.defaults.headers["accessToken"] = `Bearer ${newToken}`;
          return Api(originalRequest);
        } else {
          console.log("가로챘는데 토큰갱신이 안된경우/ 동기/비동기문제인듯");
        }
      }
      return Promise.reject(error);
    }
  );
  Api.interceptors.request.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // 만료된 토큰으로 요청이 실패한 경우
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // 토큰을 재발급하고 재시도
        const newToken = await refreshToken();
        if (newToken) {
          Api.defaults.headers["accessToken"] = `Bearer ${newToken}`;
          return Api(originalRequest);
        } else {
          console.log("가로챘는데 토큰갱신이 안된경우/ 동기/비동기문제인듯");
        }
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
        originalRequest._retry = true;
        // 토큰을 재발급하고 재시도
        const newToken = await refreshToken();
        if (newToken) {
          Api.defaults.headers["accessToken"] = `Bearer ${newToken}`;
          return Api(originalRequest);
        } else {
          console.log("가로챘는데 토큰갱신이 안된경우/ 동기/비동기문제인듯");
        }
      }
      return Promise.reject(error);
    }
  );
  Api.interceptors.request.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // 만료된 토큰으로 요청이 실패한 경우
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // 토큰을 재발급하고 재시도
        const newToken = await refreshToken();
        if (newToken) {
          Api.defaults.headers["accessToken"] = `Bearer ${newToken}`;
          return Api(originalRequest);
        } else {
          console.log("가로챘는데 토큰갱신이 안된경우/ 동기/비동기문제인듯");
        }
      }
      return Promise.reject(error);
    }
  );
  return Api;
};
