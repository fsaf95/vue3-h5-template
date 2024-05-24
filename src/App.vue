<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { getToken } from "@/utils/token";
import { getManager } from "@/api";
import { showFailToast } from "vant";
import { useUser } from "@/store/user";
const useInfo = useUser()

onMounted(()=>{
  const token = getToken()
  if (token){
    getManager().then(res=>{
      if (res.code !== 0){
        showFailToast(res.msg)
      }else{
        useInfo.userInfo = res.data
        console.log(useInfo.userInfo);
      }
    })
  }
})
</script>
<style lang="less">
.van-toast {
  --van-toast-default-width: 70%;
  --van-toast-font-size: 28px;
}
</style>
