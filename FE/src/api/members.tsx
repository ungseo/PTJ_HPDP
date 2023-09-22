import { membersApi, membersApiFormData } from ".";
import { AxiosResponse } from "axios";
import * as Interfaces from "../interface/apiDataInterface";

const api = membersApi;
const apiForm = membersApiFormData;

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
  apiForm.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await apiForm.put("", formData).then(success).catch(fail);
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
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get("/fundings").then(success).catch(fail);
}
