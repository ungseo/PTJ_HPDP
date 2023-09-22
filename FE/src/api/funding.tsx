import { AxiosResponse } from "axios";
import { fundingsApi } from ".";
import * as Interfaces from "../interface/apiDataInterface";
import { SuccessPage } from "../pages/Toss/SuccessPage";

const api = fundingsApi;

export async function getFundingTotalList(
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
  await api.get("").then(success).catch(fail);
}

export async function getFundingProgress(
  companyid: number | null,
  done: number | null,
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
  let apiUrl = "";
  apiUrl += `?companyId=${companyid}`;
  apiUrl += `&done=${done}`;
  await api.get(apiUrl).then(success).catch(fail);
}

export async function getFundingDetail(
  fundingid: number,
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
  await api.get(`/${fundingid}`).then(success).catch(fail);
}
