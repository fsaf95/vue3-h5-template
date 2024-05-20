<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const active = ref(0);
const tabbarData = reactive([
  {
    icon: "wap-home-o",
    title: "数据",
    to: {
      name: "Demo"
    }
  },
  {
    icon: "manager-o",
    title: "客户",
    to: {
      name: "CustomerList"
    }
  },
]);
</script>
<style lang="less">
.van-tabbar__placeholder {
  --van-tabbar-height: 120px;
  --van-tabbar-item-font-size: 26px;
  --van-tabbar-item-icon-size: 52px;
  --van-tabbar-item-text-color: #333333;
  --van-tabbar-item-active-color: #e81414;
}
</style>
