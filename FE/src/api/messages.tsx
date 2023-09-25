import { AxiosResponse } from "axios";
import { customApi } from ".";

export async function getMessage(
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
  const api = customApi("points");
  console.log(accessToken);
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.post("").then(success).catch(fail);
}
