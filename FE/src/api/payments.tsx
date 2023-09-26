import { AxiosResponse } from "axios";
import { customApi, customApiForm } from ".";
import * as Interfaces from "../interface/apiDataInterface";

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
  const api = customApi("payments");
  api.defaults.headers["accessToken"] = `Bearer ${data.accessToken}`;

  await api
    .post("", { card: data.cardCode, amount: data.amount })
    .then(success)
    .catch(fail);
}
