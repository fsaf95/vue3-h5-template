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

onMounted(async ()=>{
  const token = getToken()
  if (token){
    await getManager().then(res=>{
      if (res.code !== 0){
        showFailToast(res.msg)
      }else{
        useInfo.userInfo = res.data
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
