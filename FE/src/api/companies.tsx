import { AxiosResponse } from "axios";
import { customApi, customApiForm } from ".";
import * as Interfaces from "../interface/apiDataInterface";

export async function getCompaniesInfo(
  keyword: string | null,
  accessToken: string | null,
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
  const api = customApi(
    `companies${keyword ? `?keyword=${keyword}` : "?keyword="}`
  );
  if (accessToken) {
    api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  }
  await api.get(``).then(success).catch(fail);
}

export async function getCompanyItem(
  accessToken: string | null,
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
  const api = customApi("companies");
  if (accessToken) {
    api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  }
  await api.get(`/${companyId}`).then(success).catch(fail);
}

export async function getMyCompanyInfo(
  accessToken: string,
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
  const api = customApi("companies");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get("").then(success).catch(fail);
}
