import { AxiosResponse } from "axios";
import { banksApi } from ".";
import * as Interfaces from "../interface/apiDataInterface";

const api = banksApi;

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
    // data는 추후 해당 페이지에서 객체로 정의하고 params로 전달하도록 수정하기
    const data = {
      accountNumber: accountNumber,
      accountPw: accountPw,
      bankCode: bankCode,
    }

    api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
    await api.post('', data).then(success).catch(fail);
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
      api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
      await api.post(`/account`).then(success).catch(fail);
  }

// 계좌 이체
export async function transAccount(
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
    api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
    await api.post(`/transfer`).then(success).catch(fail);
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
    api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
    await api.post(`/delete`).then(success).catch(fail);
}