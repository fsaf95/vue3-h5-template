<template>
  <div class="w-full h-auto bg-white mt-[20px]">
    <div class="w-full flex items-center justify-between p-[26px] border-b-4 border-slate-300">
      <div class="text-[24px]">活动类型：微信立减和折扣</div>
      <div class="dropdown-menu">
        <button @click="isDropdownVisible = !isDropdownVisible">
          {{ selectedItem }} <van-icon :name="isDropdownVisible?'arrow-up':'arrow-down'" />
        </button>
        <div v-if="isDropdownVisible" class="dropdown-content">
          <ul>
            <li
              v-for="(item, index) in dropdownItems"
              :key="index"
              @click="selectItem(item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-full box-border overflow-hidden px-[26px] pt-[26px] pb-[40px]">
      <div class="consume-date-tabbed">
        <div
          class="consume-date-btn"
          :class="!item.state ? '' : 'action'"
          v-for="item in consumeDate"
          :key="item.id"
          @click="handleAction(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="grid gap-y-[30px] gap-x-[50px] grid-cols-2 my-[40px]">
        <div class="flex items-start text-[26px]">
          <div class="font-bold">
            {{ consumeDate[actionId - 1].name }}消耗：
          </div>
          <div class="font-bold text-[#f3615f] text-right">
            <p class="">{{ Number(consumeList[actionId].consume).toFixed(2) }} 元</p>
            <p class="text-right">
              {{ consumeList[actionId].consumeAmount }} 笔
            </p>
          </div>
        </div>
        <div class="flex items-start text-[26px]">
          <div class="font-bold">
            {{ consumeDate[actionId - 1].name }}核销：
          </div>
          <div class="font-bold text-[#f3615f] text-right">
            <p>{{ Number(consumeList[actionId].work).toFixed(2) }} 元</p>
            <p>{{ consumeList[actionId].workAmount }} 笔</p>
          </div>
        </div>
        <div class="flex items-start text-[26px]">
          <div class="font-bold">
            {{ consumeDate[actionId - 1].name }}累积消耗：
          </div>
          <div class="font-bold text-[#f3615f] text-right">
            <p>{{ Number(consumeList[actionId].totalPoints).toFixed(2) }} 元</p>
            <p>{{ consumeList[actionId].totalPointsAmount }} 笔</p>
          </div>
        </div>
        <div class="flex items-start text-[26px]">
          <div class="font-bold">撬动消费：</div>
          <div class="font-bold text-[#f3615f] text-right">
            <p>{{ Number(consumeList[actionId].spentResources).toFixed(2) }} 元</p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between px-[66px]">
        <div class="relative w-[250px] h-[250px]">
          <div
            class="absolute top-[50%] left-[50%] z-10 text-center w-full"
            style="transform: translate(-50%, -50%)"
          >
            <p class="font-medium text-[26px] text-[#605d5d]">发放率</p>
            <p class="font-bold text-[#605d5d] text-[46px] text-[#000000]">66.6%</p>
            <p class="font-medium text-[#ffffff] text-[26px]">
              总消耗 / 总预算
            </p>
          </div>
          <LiquidFill :sliderValue="consumePer" :height="250"></LiquidFill>
        </div>
        <div class="relative w-[250px] h-[250px] z-10 text-center w-full">
          <div
            class="absolute top-[50%] left-[50%] z-10 w-full"
            style="transform: translate(-50%, -50%)"
          >
            <p class="font-medium text-[26px] text-[#605d5d]">核销率</p>
            <p class="font-bold text-[#605d5d] text-[46px] text-[#000000]">66.6%</p>
            <p class="font-medium text-[#ffffff] text-[20px]">
              总核销金额 / 总消耗
            </p>
          </div>
          <LiquidFill :sliderValue="consumePer" :height="250"></LiquidFill>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import LiquidFill from "@/views/demo/component/LiquidFill.vue";

interface Props {
  consumePer: unknown;
}

const props = defineProps<Props>();
const isDropdownVisible = ref(false);
const selectedItem = ref("立减和折扣"); // 用来存储选中的项目
const actionId = ref(1);

const dropdownItems = ref([
  { id: 1, name: "立减和折扣" },
  { id: 2, name: "代金券" }
]);

const consumeDate = ref([
  { id: 1, state: true, name: "今日" },
  { id: 2, state: false, name: "昨日" },
  { id: 3, state: false, name: "本月" },
  { id: 4, state: false, name: "本年" }
]);

const consumeList = ref({
  1: {
    consume: "123123",
    work: "1515",
    workAmount: "100",
    consumeAmount: "66",
    totalPoints: "5645",
    totalPointsAmount: "12",
    spentResources: "151211"
  },
  2: {
    consume: "322",
    work: "422323",
    workAmount: "4221",
    consumeAmount: "66",
    totalPoints: "424",
    totalPointsAmount: "23",
    spentResources: "5343"
  },
  3: {
    consume: "53232",
    work: "2233",
    workAmount: "12",
    consumeAmount: "23",
    totalPoints: "42233",
    totalPointsAmount: "42",
    spentResources: "412332"
  },
  4: {
    consume: "231",
    work: "42342",
    workAmount: "42",
    consumeAmount: "423",
    totalPoints: "4242",
    totalPointsAmount: "32",
    spentResources: "452132"
  }
});
const handleAction = data => {
  actionId.value = data.id;
  consumeDate.value.forEach(item => {
    item.state = item.id === data.id;
  });
};
const selectItem = (item: object) => {
  selectedItem.value = item.name; // 更新选中的项目
  isDropdownVisible.value = false; // 关闭下拉菜单
};
</script>

<style scoped lang="less">
.dropdown-menu {
  position: relative;
  display: inline-block;
  text-align: right;
  width: 180px;
  font-size: 24px;
  font-weight: 500;
}

.dropdown-content {
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown-content ul {
  list-style: none;
  padding: 0;
}

.dropdown-content li {
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 8px;
}

.consume-date-tabbed {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 460px;

  .consume-date-btn {
    padding: 10px 28px;
    text-align: center;
    border-radius: 10px;
    background-color: #e5e5e5;
    color: #ffffff;
    font-size: 24px;

    &.action {
      background-color: #ec0e07;
    }
  }
}
</style>
