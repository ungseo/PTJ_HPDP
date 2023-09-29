import { AxiosResponse } from "axios";
import { customApi } from ".";
import * as Interfaces from "../interface/apiDataInterface";

// 관심 기업 조회
export async function getNotifications(
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
  const api = customApi("interests");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get(``).then(success).catch(fail);
}
