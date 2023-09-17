import { AxiosResponse } from "axios";
import { paymentsApi } from ".";
import * as Interfaces from "../interface/apiDataInterface";

const api = paymentsApi;

export async function createPayments(
  data: Interfaces.InCreatePaymentsInterface,
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
  api.defaults.headers["accessToken"] = `Bearer ${data.header.accessToken}`;

  await api.post("/payments", data).then(success).catch(fail);
}
