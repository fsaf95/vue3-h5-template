<template>
  <div class="min-h-[100vh] box-border overflow-hidden bg-neutral-50">
    <div class="pt-32 px-[70px]">
      <div class="flex justify-center items-center">
        <van-image
          round
          class="w-[420px] h-[160px]"
          :src="iconLogo"
          alt=""
        />
        <!--        <p class="text-3xl pl-2">广发银行</p>-->
      </div>
      <div class="w-[120px] h-[120px] mt-10 mb-6 m-auto overflow-hidden box-border">
        <van-image
          round
          class="w-full h-full"
          :src="iconUser"
        />
      </div>
      <div class="mt-6 overflow-hidden box-border">
        <div class="flex items-center text-lg">
          <p class="flex-none">手机号：</p>
          <input
            class="flex-auto py-1.5 px-2 rounded-lg border-4"
            v-model="infoUser.userPhone"
            name="手机号"
            type="tel"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </div>
        <div class="flex items-center text-lg relative mt-4">
          <p class="flex-none">验证码：</p>
          <input
            class="flex-auto py-1.5 px-2 rounded-lg border-4"
            v-model="infoUser.userCaptcha"
            maxlength="6"
            placeholder="请输入短信验证码"
          />
          <van-button
            class="!absolute !px-2 !h-full !right-0 !text-sm !rounded-r-lg"
            size="small"
            type="primary"
            :disabled="infoUser.flag"
            @click="sendCode"
          >
            {{ infoUser.buttonMsg }}
          </van-button>
        </div>

        <van-button
          class="!w-56 !h-10 !mt-12 !m-auto !block !text-base"
          :loading="infoUser.loading"
          type="danger"
          round
          loading-text="登录..."
          size="large"
          :disabled="zhudState"
          @click="clickLogin"
        >
          登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUser } from "@/store/user";
import { isPhoneNumberValid, isUsercaptchaValue } from "@/utils/utils";
import { showFailToast, showSuccessToast } from "vant";
import { login, loginSms } from "@/api";
import { calculateValidTime } from "@/utils/token";
import * as path from "path";
import iconLogo from "@/assets/gf-logo.png";
import iconUser from "@/assets/icon-logo.png";

const infoUser = useUser();
const route = useRoute();
const router = useRouter();

const return_url = ref("");

onMounted(() => {
  return_url.value = route.query;
});

const zhudState = computed(() => {
  if (infoUser.userPhone && infoUser.userCaptcha) {
    return false;
  } else {
    return true;
  }
});

// 点击获取验证码
const sendCode = async () => {
  //验证手机号码是否正确
  if (!isPhoneNumberValid(infoUser.userPhone)) {
    return;
  }
  if (infoUser.flag === false) {
    // 调用 验证码api接口
    await loginSms({ mobile: infoUser.userPhone, login_scene: "manager" })
      .then(res => {
        if (res.code === 0) {
          infoUser.flag = true;
          infoUser.handleCountDownChange();
          showSuccessToast(res.msg);
        } else {
          showFailToast(res.msg);
        }
      }).catch(() => {
        showFailToast("服务器开小差了，请刷新后重试1111111111111");
      });
  }
};

//手机验证弹窗-确认按钮回调
const clickLogin = () => {
  if (!isPhoneNumberValid(infoUser.userPhone)) {
    return;
  }
  if (!isUsercaptchaValue(infoUser.userCaptcha)) {
    return;
  }
  infoUser.loading = true;
  apiGetLogin();
};

// 登录接口回调
const apiGetLogin = () => {
  login({ mobile: infoUser.userPhone, sms_code: infoUser.userCaptcha })
    .then(res => {
      infoUser.loading = false;
      if (res.code === 0) {
        infoUser.handleTokenChange(res.data.token);
        calculateValidTime(res.data.token.expires_in); // 计算token的有效时间
        if (return_url.value.redirect) {
          router.push(return_url.value.redirect);
        } else {
          router.push({ path: "/demo" });
        }
      } else {
        showFailToast(res.msg);
      }
    })
    .catch(error => {
      infoUser.loading = false;
      showFailToast("服务器开小差了，请刷新后重试");
    });
};
</script>

<style lang="less">
.van-toast {
  --van-toast-font-size: 34px;
  --van-toast-text-padding: 10px 20px;
  --van-toast-line-height: 1.6em;
}
</style>
