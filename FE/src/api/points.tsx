import { AxiosResponse } from "axios";
import { customApi } from ".";
import * as Interfaces from "../interface/apiDataInterface";

// 끝전/충전, 후원 내역
export async function getPointList(
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
  const api = customApi("points");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get(`trade`).then(success).catch(fail);
}

//
export async function getSponsor(
  accessToken: string | null,
  fundingId: number | null,
  sponsorPoint: number,
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
    fundingId: fundingId,
    sponsorPoint: sponsorPoint,
  };
  const api = customApi("points");
  console.log(accessToken);
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.post("", data).then(success).catch(fail);
}

// 끝전/충전, 후원 내역
export async function getPoint(
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
  const api = customApi("points");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get(``).then(success).catch(fail);
}
