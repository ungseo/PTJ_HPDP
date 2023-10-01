import { AxiosResponse } from "axios";
import { customApi } from ".";
import * as Interfaces from "../interface/apiDataInterface";

// 계좌 등록
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
