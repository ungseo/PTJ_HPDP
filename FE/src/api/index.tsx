import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";
import { AnyAction, Dispatch } from "redux";
// export const refreshToken =
//   (): ThunkAction<Promise<void>, RootState, null, AnyAction> =>
//   async (dispatch: Dispatch) => {
//     const storage = sessionStorage.getItem("persist:root");
//     if (storage) {
//       const parsedData = JSON.parse(storage);
//       const userData = JSON.parse(parsedData.user);
//       const data = {
//         accessToken: userData.auth.accessToken,
//         refreshToken: userData.auth.refreshToken,
//       };
//       console.log(data);
//       let Atoken = "";
//       const api = customApi("auth");
//       api
//         .post("/regenerate", data)
//         .then((res) => {
//           const tokens = {
//             accessToken: res.headers["accessToken"],
//             refreshToken: res.headers["refreshToken"],
//           };
//           console.log(tokens, "토큰 재발금 성공");
//           dispatch(userActions.updateTokens(tokens));
//           return tokens.accessToken;
//         })
//         .catch((err) => {
//           alert("토큰재발급부터 실패");
//           return null;
//         });
//     }
//     // 반환 형식을 Promise<void>에 맞게 수정
//     return dispatch(userActions.updateTokens(Atoken));
//   };
const refreshToken = () => {
  const storage = sessionStorage.getItem("persist:root");
  if (storage) {
    const parsedData = JSON.parse(storage);
    const userData = JSON.parse(parsedData.user);
    const data = {
      accessToken: userData.auth.accessToken,
      refreshToken: userData.auth.refreshToken,
    };
    const response = axios
      .post(`${process.env.REACT_APP_API_URL}/auth/regenerate`, data)
      .then((res) => {
        const data = {
          accessToken: res.headers.accessToken,
          refreshToken: res.headers.refreshToken,
        };

        const saveTokens = () => async (dispatch: Dispatch) => {
          return dispatch(userActions.updateTokens(data));
        };
        saveTokens();
        return data.accessToken;
      })
      .catch((err) => {
        console.log("alert", err);
        return null;
      });
    return response;
  }
  return null;
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
        const accessToken = newToken;
        Api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;

        return Api(originalRequest);
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
        const accessToken = newToken;
        Api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;

        return Api(originalRequest);
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
        const accessToken = newToken;
        Api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;

        return Api(originalRequest);
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
        const accessToken = newToken;
        Api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;

        return Api(originalRequest);
      }
      return Promise.reject(error);
    }
  );
  return Api;
};
