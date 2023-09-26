import { AxiosResponse } from "axios";
import { customApi } from ".";

export async function getSendingMessage(
  accessToken: string | null,
  receiverId: number,
  title: string,
  content: string,
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
    receiverId: receiverId,
    title: title,
    content: content,
  };
  const api = customApi("messages");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.post("", data).then(success).catch(fail);
}

export async function getMessage(
  accessToken: string | null,
  flag: number,
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
  const api = customApi("messages");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get(`?flag=${flag}`).then(success).catch(fail);
}

export async function getMessageDetail(
  accessToken: string | null,
  messageId: number,
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
  const api = customApi("messages");
  api.defaults.headers["accessToken"] = `Bearer ${accessToken}`;
  await api.get(`/${messageId}`).then(success).catch(fail);
}
