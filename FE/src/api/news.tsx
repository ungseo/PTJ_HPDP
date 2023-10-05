import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_NEWS_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export function newsCrolling(
  companyId: number,
  success: (
    res: AxiosResponse<any, any>
  ) =>
    | AxiosResponse<any, any>
    | PromiseLike<AxiosResponse<any, any>>
    | null
    | undefined
    | void,
  fail: (err: any) => PromiseLike<never> | null | undefined | void
) {
  api.get("/news").then(success).catch(fail);
}

export function companyInfoOpenAPI(
  accessToken: string,
  companyId: number,
  success: (
    res: AxiosResponse<any, any>
  ) =>
    | AxiosResponse<any, any>
    | PromiseLike<AxiosResponse<any, any>>
    | null
    | undefined
    | void,
  fail: (err: any) => PromiseLike<never> | null | undefined | void
) {
  const openAPI = api;
  openAPI.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  openAPI.get(`/news/${companyId}`).then(success).catch(fail);
}
