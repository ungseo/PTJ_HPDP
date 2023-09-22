import { customApi, customApiForm } from ".";
import { AxiosResponse } from "axios";
import * as Interfaces from "../interface/apiDataInterface";

//내 정보 조회

export async function getMemberInfo(
  accessToken: string | null,
  success: (
    res: AxiosResponse<any, any>
  ) =>
    | AxiosResponse<any, any>
    | PromiseLike<AxiosResponse<any, any>>
    | void
    | null,
  fail: (err: any) => PromiseLike<never> | null | void
) {
  const api = customApi("members");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get("").then(success).catch(fail);
}

export async function updateMemberInfo(
  accessToken: string | null,
  formData: FormData,
  success: (
    res: AxiosResponse<any, any>
  ) =>
    | AxiosResponse<any, any>
    | PromiseLike<AxiosResponse<any, any>>
    | void
    | null,
  fail: (err: any) => PromiseLike<never> | null | void
) {
  customApiForm("members").defaults.headers[
    "accessToken"
  ] = `Bearer ${accessToken}`;
  await customApiForm("members").put("", formData).then(success).catch(fail);
}

export async function searchMemberFundingHistory(
  accessToken: string | null,
  success: (
    res: AxiosResponse<any, any>
  ) =>
    | AxiosResponse<any, any>
    | PromiseLike<AxiosResponse<any, any>>
    | void
    | null,
  fail: (err: any) => PromiseLike<never> | null | void
) {
  customApi("members").defaults.headers[
    "accessToken"
  ] = `Bearer ${accessToken}`;
  await customApi("members").get("/fundings").then(success).catch(fail);
}
