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
        <div class="relative w-[250px] h-[250px]">
          <div
            class="absolute top-[50%] left-[50%] z-10"
            style="transform: translate(-50%, -50%)"
          >
            <p class="font-bold text-[26px] text-[#333333]">8888000.00</p>
            <p class="font-medium text-[#333333] text-[18px] text-center">
              已消耗金额
            </p>
          </div>
          <LiquidFill :sliderValue="consumePer"></LiquidFill>
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
    <BarEcharts />
    <div class="w-full h-auto bg-white mt-[20px] p-[26px]">
      <p class="text-2xl font-bold text-[#000000]">计算说明</p>
      <ul class="explain-list mt-2">
        <li>
          <span>总发券金额(总消耗)：</span>总发券笔数 * 优惠券面额
        </li>
        <li>
          <span>总发券笔数：</span>已发放的微信券的总名额（此数据不包含已过期的券，当券设置了有效期，客户领了券未在有效期内使用，被领取的券过期后，名额将释放出来）
        </li>
        <li><span>总预算：</span>自定义设定值，如100万</li>
        <li><span>剩余预算：</span>总预算 - 总发券金额</li>
        <li><span>总核销金额：</span>总核销笔数 * 优惠券面额</li>
        <li><span>总核销笔数：</span>已核销的券的总数量</li>
        <li><span>当日核销金额：</span>当天核销笔数 * 优惠券面额</li>
        <li><span>当日核销笔数：</span>当天核销的券的总数量</li>
        <li><span>总预算占比：</span>总核销金额 / 总预算</li>
        <li><span>总预算消耗占比：</span>总核销金额 / 当前占用总预算</li>
        <li><span>消费金额：</span>立减券核销后，产生的订单金额</li>
        <li><span>撬动比：</span>核销金额 / 消费金额</li>
      </ul>
    </div>
    <div
      class="bg-[#f2f2f2] text-sm font-medium text-center py-3 text-[#9aa0a8]"
    >
      <p>广州蓝鼎网络有限公司</p>
      <p>服务电话：400-8808-248</p>
    </div>
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
.explain-list {
  padding: 0 14px;
  list-style-type: disc;
  list-style-position: inside;
  box-sizing: border-box;
  color: #333333;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.5em;
  span{
    font-weight: bold;
    color: #5788fb;
  }
}
</style>
