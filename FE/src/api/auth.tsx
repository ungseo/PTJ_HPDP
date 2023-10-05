import { AxiosResponse } from "axios";
import { customApi } from "./index";
import * as Interfaces from "../interface/apiDataInterface";

export async function signup(
  data: Interfaces.InSignupInterface,
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
  await customApi("auth").post("", data).then(success).catch(fail);
}

export async function login(
  type: number | undefined | null,
  data: Interfaces.InLoginInterface,
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
  await customApi("auth")
    .post(`/login?type=${type}`, data)
    .then(success)
    .catch(fail);
}

export async function duplicationIdCheck(
  loginId: string,
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
  await customApi("auth").get(`/check/${loginId}`).then(success).catch(fail);
}

export async function logout(
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
  const api = customApi("auth");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.post(`/logout`).then(success).catch(fail);
}

export async function expireToken(
  data: Interfaces.TokenInterface,
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
  await customApi("auth").post(`/regenerate`, data).then(success).catch(fail);
}
