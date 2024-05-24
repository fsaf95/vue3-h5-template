// store/user.js代码如下
import { defineStore } from "pinia";
import { store } from "@/store";
import { handleLocalStorage } from "@/utils/token";

export const User = defineStore({
  id: 'user',
  state: () => ({
    userInfo:{}, // 客户经理详细信息
    userPhone: "", //手机号码
    userCaptcha: "", //验证码
    buttonMsg: "获取验证码", //验证码提示语
    loading: false,
    flag: false, //获取验证码的状态
    waitTime: 60, // 获取验证码按钮失效时间
    access_token: "", // token
    token_type: "", // token状态
    expires_in: "", // token有效时间
    refresh_token: "", //
    timer: null,
  }),
  /**
   * 用来封装计算属性 有缓存功能  类似于computed
   */
  getters: {},
  /**
   * 编辑业务逻辑  类似于methods
   */
  actions: {
    //存储token
    handleTokenChange(data) {
      // alert("获取到token的对象值:" + JSON.stringify(data))
      this.access_token = data.access_token;
      this.expires_in = data.expires_in;
      this.token_type = data.token_type;
      this.refresh_token = data.refresh_token;
      handleLocalStorage(data);
    },
    //获取验证码倒计时
    handleCountDownChange() {
      this.flag = true;
      this.waitTime--;
      this.buttonMsg = `${this.waitTime} 秒后重新发送`;
      const timer = setInterval(() => {
        if (this.waitTime > 1) {
          this.flag = true;
          this.waitTime--;
          this.buttonMsg = `${this.waitTime}秒后重新获取`;
        } else {
          clearInterval(timer);
          this.buttonMsg = "重新获取";
          this.flag = false;
          this.waitTime = 61;
        }
      }, 1000);
    }
  }
});

export function useUser() {
  return User(store);
}
