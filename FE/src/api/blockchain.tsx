import { AxiosResponse } from "axios";
import { customApi } from ".";

export async function getBlockchainInfo(
  accessToken: string,
  pointHistoryId: number,
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
  await customApi("blockchain")
    .get(`/${pointHistoryId}`)
    .then(success)
    .catch(fail);
}
export async function getMemberBlockchainInfo(
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
  const api = customApi(`blockchain`);
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get("/member").then(success).catch(fail);
}
export async function getCompanyBlockchainInfo(
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
  const api = customApi(`blockchain`);
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get(`/company/${companyId}`).then(success).catch(fail);
}
