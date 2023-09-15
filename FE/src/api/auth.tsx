import { authApi, authApiFormData } from "./index";
import { AxiosResponse } from "axios";
import * as Interfaces from "../interface/apiDataInterface";
const api = authApi;
const apiForm = authApiFormData;

export async function signup(
  data: Interfaces.InSignupInterface,
  success:
    | ((
        res: AxiosResponse<any, any>
      ) => AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>>)
    | null
    | undefined,
  fail: ((err: any) => PromiseLike<never>) | null | undefined
) {
  await api.post("/signup", data).then(success).catch(fail);
}

export async function login(
  type: number | undefined | null,
  data: Interfaces.InLoginInterface,
  success:
    | ((
        res: AxiosResponse<any, any>
      ) => AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>>)
    | null
    | undefined,
  fail: ((err: any) => PromiseLike<never>) | null | undefined
) {
  await api.post(`/login?type=${type}`, data).then(success).catch(fail);
}

export async function duplicationIdCheck(
  loginId: string,
  success:
    | ((
        res: AxiosResponse<any, any>
      ) => AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>>)
    | null
    | undefined,
  fail: ((err: any) => PromiseLike<never>) | null | undefined
) {
  await api.get(`/check/${loginId}`).then(success).catch(fail);
}

export async function logout(
  accessToken: Interfaces.InLogoutRequestInterface,
  success:
    | ((
        res: AxiosResponse<any, any>
      ) => AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>>)
    | null
    | undefined,
  fail: ((err: any) => PromiseLike<never>) | null | undefined
) {
  api.defaults.headers["accessToken"] = `Baerer ${accessToken}`;
  await api.post(`/logout`).then(success).catch(fail);
}

export async function expireToken(
  data: Interfaces.TokenInterface,
  success:
    | ((
        res: AxiosResponse<any, any>
      ) => AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>>)
    | null
    | undefined,
  fail: ((err: any) => PromiseLike<never>) | null | undefined
) {
  await api.post(`/regenerate`, data).then(success).catch(fail);
}
