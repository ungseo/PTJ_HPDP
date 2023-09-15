import { AxiosResponse } from "axios";

export interface successFunctionInterface {
  success:
    | ((
        value: AxiosResponse<any, any>
      ) => AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>>)
    | null
    | undefined;
}

export interface failFunctionInterface {
  fail: ((reason: any) => PromiseLike<never>) | null | undefined;
}
