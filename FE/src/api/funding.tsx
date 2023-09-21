import { AxiosResponse } from "axios";
import { fundingsApi } from ".";
import * as Interfaces from "../interface/apiDataInterface";

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
