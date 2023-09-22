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
  customApi("payments").defaults.headers[
    "accessToken"
  ] = `Bearer ${data.header.accessToken}`;

  await customApi("payments").post("/payments", data).then(success).catch(fail);
}
