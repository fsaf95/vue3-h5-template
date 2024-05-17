// 节流
import { showToast } from "vant";

//图形验证码验证
export function isVerificationValue(value) {
  const pattern = /^[0-9A-Za-z]{4}$/;
  if (!value) {
    return "请输入图形验证码！";
  } else if (!pattern.test(value)) {
    return "请输入正确的图形验证码！";
  } else {
    return true;
  }
}

//验证码 验证
export function isUsercaptchaValue(value) {
  const pattern = /^[0-9]{4}$/;
  if (!value) {
    showToast("请输入验证码！");
    return false;
  } else if (!pattern.test(value)) {
    showToast("请输入正确的验证码！");
    return false;
  } else {
    return true;
  }
}

// 手机号码验证
export function isPhoneNumberValid(phoneNumber) {
  const regExp =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  if (!phoneNumber) {
    showToast("请输入手机号码！");
    return false;
  } else if (!regExp.test(phoneNumber)) {
    showToast("请输入正确的手机号码！");
    return false;
  } else {
    return true;
  }
}

// 勾选验证
export function isHaveRead(state) {
  if (!state) {
    showToast("请勾选并已阅读隐私政策和活动规则！");
    return false;
  } else {
    return true;
  }
}

// 清除浏览器历史栈
export function mounted() {
  if (window.history && window.history.pushState) {
    // 向历史记录中插入了当前页
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", this.goBack, false);
  }
}
