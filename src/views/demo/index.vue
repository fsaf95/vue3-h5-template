<script setup lang="ts" name="Demo">
import { ref } from "vue";
import LiquidFill from "./component/LiquidFill.vue";
import ConsumptionFrom from "./component/ConsumptionFrom.vue";
import BarEcharts from "@/views/demo/component/barEcharts.vue";
const consumePer = ref(0.4);
const progressValue = ref(10);
</script>

<template>
  <div class="overflow-hidden box-border bg-[#f2f2f2]">
    <div class="w-full p-7 h-auto bg-white">
      <div class="flex justify-between">
        <div class="text-2xl text-[#000000] font-bold">
          <p>广发银行信用卡</p>
          <p>新客有礼</p>
        </div>
        <div class="relative w-[200px] h-[200px]">
          <div
            class="absolute top-[50%] left-[50%] z-10"
            style="transform: translate(-50%, -50%)"
          >
            <p class="font-bold text-[26px]">8888000.00</p>
            <p class="font-medium text-[#605d5d] text-[18px] text-center">
              已消耗金额
            </p>
          </div>
          <LiquidFill :sliderValue="consumePer" :height="200"></LiquidFill>
        </div>
      </div>
      <div class="mt-3">
        <p class="text-base font-bold">消耗进度</p>
        <div class="flex items-end box-border overflow-hidden">
          <div class="flex-auto progress-con box-border">
            <div
              class="pointer text-[24px]"
              :style="{ left: progressValue + '%' }"
            >
              <div>10元</div>
              <div class="dot"></div>
            </div>
            <div class="progress-bar">
              <div
                class="progress-bar-b"
                :style="{ width: progressValue + 3 + '%' }"
              ></div>
            </div>
          </div>
          <div class="flex-none pl-4 text-[24px]">总预算</div>
        </div>
        <div class="flex justify-between box-border pr-[40px] text-[24px]">
          <p>0元</p>
          <p>1000000元</p>
        </div>
      </div>
    </div>
    <ConsumptionFrom :consumePer="consumePer" />
    <BarEcharts/>
    <div class="w-full h-auto bg-white mt-[20px]">123</div>
  </div>
</template>
<style lang="less">
.progress-con {
  position: relative;
  display: flex;
  align-items: end;
  padding-bottom: 13px;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  overflow: hidden;

  .pointer {
    position: absolute;
    bottom: 6px;
    left: 0;
    z-index: 5;

    .dot {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #3751d7;
    }
  }
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 16px;
  border-radius: 20px;
  background-color: #f0f0f0;
  overflow: hidden;

  .progress-bar-b {
    position: absolute;
    left: 0;
    top: 0;
    width: 10%;
    height: 100%;
    background-color: #3751d7;
    z-index: 6;
  }
}
</style>
