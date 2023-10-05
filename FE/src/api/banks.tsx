import { AxiosResponse } from "axios";
import { customApi } from ".";
import * as Interfaces from "../interface/apiDataInterface";

// 계좌 등록
export async function registerAccount(
  accessToken: string | null,
  accountNumber: string | null,
  accountPw: string | null,
  bankCode: string | null,
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
  // 요청할 화면에서 객체로 정의하고 params로 전달하는 방법도 있다
  const data = {
    accountNumber: accountNumber,
    accountPw: accountPw,
    bankCode: bankCode,
  };
  const api = customApi("banks");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.post("", data).then(success).catch(fail);
}

// 계좌 조회
export async function getAccount(
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
  const api = customApi("banks");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.post(`/account`).then(success).catch(fail);
}

// 계좌 이체
export async function transAccount(
  accessToken: string | null,
  opponentName: string,
  opponentAccount: string,
  depositAmount: number,
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
  const data = {
    opponentName: opponentName,
    opponentAccount: opponentAccount,
    depositAmount: depositAmount,
  };
  const api = customApi("banks");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.post(`/transfer`, data).then(success).catch(fail);
}

// 내역 조회
export async function transDetailAccount(
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
  const api = customApi("banks");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.post(`/transfer-detail`).then(success).catch(fail);
}

// 계좌 해제
export async function unregisterAccount(
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
  const api = customApi("banks");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.post(`/delete`).then(success).catch(fail);
}
