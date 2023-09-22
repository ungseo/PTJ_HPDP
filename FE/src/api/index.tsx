import axios from "axios";
import { useSelector } from "react-redux";

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
    return authApi
      .post("/regenerate", data)
      .then((response) => {
        console.log(response.data);
        return response.headers.accessToken;
      })
      .catch((error) => console.log("재발행실패"));
  }
};

//
export const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true;
      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      authApi.defaults.headers["accessToken"] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    } else {
    }
    return Promise.reject(error);
  }
);

export const membersApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/members`,
  headers: {
    "Content-Type": "application/json",
  },
});

membersApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("hihihihi");
      // 토큰을 재발급하고 재시도
      const newToken = refreshToken(); // refreshToken 함수 구현 필요
      if (newToken) {
        console.log(newToken);
        membersApi.defaults.headers.common[
          "accessToken"
        ] = `Bearer ${newToken}`;
      }

      return membersApi(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const membersApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/members`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
membersApiFormData.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      membersApiFormData.defaults.headers.common[
        "accessToken"
      ] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const companiesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/companies`,
  headers: {
    "Content-Type": "application/json",
  },
});
companiesApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      companiesApi.defaults.headers.common[
        "accessToken"
      ] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const companiesApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/companies`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
companiesApiFormData.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      companiesApiFormData.defaults.headers.common[
        "accessToken"
      ] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const fundingsApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/fundings`,
  headers: {
    "Content-Type": "application/json",
  },
});
fundingsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      fundingsApi.defaults.headers.common["accessToken"] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const fundingsApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/fundings`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
fundingsApiFormData.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      fundingsApiFormData.defaults.headers.common[
        "accessToken"
      ] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const pointsApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/points`,
  headers: {
    "Content-Type": "application/json",
  },
});
pointsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      pointsApi.defaults.headers.common["accessToken"] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const pointsApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/points`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
pointsApiFormData.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      pointsApiFormData.defaults.headers.common[
        "accessToken"
      ] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const interestsApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/interests`,
  headers: {
    "Content-Type": "application/json",
  },
});
interestsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      interestsApi.defaults.headers.common[
        "accessToken"
      ] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const interestsApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/interests`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
interestsApiFormData.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      interestsApiFormData.defaults.headers.common[
        "accessToken"
      ] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const banksApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/banks`,
  headers: {
    "Content-Type": "application/json",
  },
});
banksApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      banksApi.defaults.headers.common["accessToken"] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const banksApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/banks`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
banksApiFormData.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      banksApiFormData.defaults.headers.common[
        "accessToken"
      ] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const paymentsApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/payments`,
  headers: {
    "Content-Type": "application/json",
  },
});
paymentsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      paymentsApi.defaults.headers.common["accessToken"] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const messagesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/messages`,
  headers: {
    "Content-Type": "application/json",
  },
});
messagesApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 만료된 토큰으로 요청이 실패한 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰을 재발급하고 재시도
      const newToken = await refreshToken(); // refreshToken 함수 구현 필요
      messagesApi.defaults.headers.common["accessToken"] = `Bearer ${newToken}`;
      return authApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const messagesApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/messages`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const articlesApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/articles`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const articlesApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/articles`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const newsApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/news`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const newsApiFormData = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/news`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
