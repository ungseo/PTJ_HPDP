import { AxiosResponse } from "axios";
import { customApi } from ".";
import * as Interfaces from "../interface/apiDataInterface";

// 알람 조회
export async function getAlarms(
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
  const api = customApi("alarm");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get(`/news`).then(success).catch(fail);
}

// 알람 읽음
export async function readAlarms(
  accessToken: string | null,
  newsAlarmId: number,
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
  const api = customApi("alarm");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get(`/${newsAlarmId}}`).then(success).catch(fail);
}
