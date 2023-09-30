import { AxiosResponse } from "axios";
import { customApi, customApiForm } from ".";

export async function getMain(
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
  await customApi("main").get("").then(success).catch(fail);
}
