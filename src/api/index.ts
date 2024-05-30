import { http } from "@/utils/http";

type ListResult = {
  code: number;
  message: string;
  data: Array<any>;
};

interface customerType {
  keyword?: string;
  obtain_status?: number;
  page?: number;
}

// 增加客户
interface addCustomer {
  mobile?: string
  customer_name?: string
  act_id?: string
}

export function loginSms(data?: object): Promise<ListResult> {
  return http.request({
    url: "/page/bank/sms/" + "5jQZ537gd" + "/" + "JwYRbnRVr",
    method: "post",
    data
  });
}

export function login(data?: object): Promise<ListResult> {
  return http.request({
    url: "/page/bank/manager/loginByManager/" + "5jQZ537gd",
    method: "post",
    data
  });
}

// 新增客户
export function createCustomer(data: addCustomer): Promise<ListResult> {
  return http.request({
    url: "/page/bank/manager/createCustomer/" + "5jQZ537gd",
    method: "post",
    data
  });
}

// 获取客户经理信息
export function getManager(data?: object): Promise<ListResult> {
  return http.request({
    url: "/page/bank/manager/getManager/" + "5jQZ537gd",
    method: "post",
    data
  });
}

//客户名单
export function searchCustomer(data?: customerType): Promise<ListResult> {
  return http.request({
    url: "/page/bank/manager/searchCustomer/" + "5jQZ537gd",
    method: "post",
    data
  });
}

//刷新token
export function smsRefresh(data?: object): Promise<ListResult> {
  return http.request({
    url: "/page/boc/refresh_token/" + "5jQZ537gd",
    method: "post",
    headers: { Authorization: data.token_type + " " + data.refresh_token }
  });
}

// 数据看板总数据
export function getCommonStatics(data?: object): Promise<ListResult> {
  return http.request({
    url: "/page/bank/manager/getCommonStatics/" + "5jQZ537gd",
    method: "post",
    data
  });
}

// 数据看板券统计数据
export function getStaticsData(data?: any): Promise<ListResult> {
  return http.request({
    url: "/page/bank/manager/getStaticsData/" + "5jQZ537gd",
    method: "post",
    data
  });
}

export function getStaticsDataByTime(data?: any): Promise<ListResult> {
  return http.request({
    url: "/page/bank/manager/getStaticsDataByTime/" + "5jQZ537gd",
    method: "post",
    data
  });
}
