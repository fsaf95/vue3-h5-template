import { http } from "@/utils/http";

type ListResult = {
  code: number;
  message: string;
  data: Array<any>;
};

export function loginSms(data?: object): Promise<ListResult> {
  return http.request({
    url: "'/page/boc/sms/LoginSms",
    method: "post",
    data
  });
}

export function login(data?: object): Promise<ListResult> {
  return http.request({
    url: "'/page/login/LoginSms",
    method: "post",
    data
  });
}
