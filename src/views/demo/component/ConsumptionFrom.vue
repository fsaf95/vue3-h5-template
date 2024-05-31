<template>
  <div class="w-full h-auto bg-white mt-[20px]">
    <div
      class="w-full flex items-center justify-between p-[26px] border-b-4 border-slate-300"
    >
      <div class="text-[26px] text-[#333333] font-bold">活动类型：微信立减和折扣</div>
      <div class="dropdown-menu">
        <button @click="isDropdownVisible = !isDropdownVisible">
          {{ selectedItem }}
          <van-icon :name="isDropdownVisible ? 'arrow-up' : 'arrow-down'" />
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
    <div
      class="w-full box-border overflow-hidden px-[26px] pt-[26px] pb-[40px]"
    >
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
          <p class="font-bold w-[136px]">消 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 耗：</p>
          <div class="font-bold text-[#f3615f] text-right">
            <p class="">
              {{ Number(staticsData.consumption).toFixed(2) }} 元
            </p>
            <p class="text-right">
              {{ staticsData.consumption_count }} 笔
            </p>
          </div>
        </div>
        <div class="flex items-start text-[26px]">
          <p class="font-bold w-[136px]">核 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 销：</p>
          <div class="font-bold text-[#f3615f] text-right">
            <p>{{ Number(staticsData.verification_amount).toFixed(2) }} 元</p>
            <p>{{ staticsData.verification_count }} 笔</p>
          </div>
        </div>
        <div class="flex items-start text-[26px]">
          <p class="font-bold w-[136px]">累积消耗：</p>
          <div class="font-bold text-[#f3615f] text-right">
            <p>{{ Number(staticsData.total_consumption).toFixed(2) }} 元</p>
            <p>{{ staticsData.total_consumption_count }} 笔</p>
          </div>
        </div>
        <div class="flex items-start text-[26px]" v-if="useInfo.userInfo.role == 2">
          <p class="font-bold w-[136px]">拓客人数：</p>
          <div class="font-bold text-[#f3615f] text-right">
            <p>{{ Number(staticsData.toker_count) }} 人</p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between px-[40px]">
        <div class="relative w-[280px] h-[280px] z-10 text-center w-full">
          <div
            class="absolute top-[50%] left-[50%] z-10 text-center w-full"
            style="transform: translate(-50%, -50%)"
          >
            <p class="font-medium text-[26px] text-[#605d5d]">发放率</p>
            <p class="font-bold text-[#605d5d] text-[46px] text-[#333333]">
              {{ staticsData.consumption_rate_str || 0 }}%</p>
            <p class="font-medium text-[#333333] text-[26px]">
              总消耗 / 总预算
            </p>
          </div>
          <LiquidFill :sliderValue="staticsData.consumption_rate"></LiquidFill>
        </div>
        <div class="relative w-[280px] h-[280px] z-10 text-center w-full">
          <div
            class="absolute top-[50%] left-[50%] z-10 w-full"
            style="transform: translate(-50%, -50%)"
          >
            <p class="font-medium text-[26px] text-[#605d5d]">核销率</p>
            <p class="font-bold text-[#605d5d] text-[46px] text-[#333333]">
              {{ staticsData.verification_amount_rate_str }}%</p>
            <p class="font-medium text-[#333333] text-[20px]">
              总核销金额 / 总消耗
            </p>
          </div>
          <LiquidFill :sliderValue="staticsData.verification_amount_rate"></LiquidFill>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import LiquidFill from "@/views/demo/component/LiquidFill.vue";
import { getManager, getStaticsData } from "@/api/index.ts";
import { showFailToast } from "vant";
import { getToken } from "@/utils/token";
import { useUser } from "@/store/user";
import { errorCode } from "@/utils/utils";

const useInfo = useUser()
const isDropdownVisible = ref(false);
const selectedItem = ref("立减和折扣"); // 用来存储选中的项目
const timeFrame = ref("today");
const staticsData = ref({});
const aaa: number = ref(0.005);

const dropdownItems = ref([
  { id: 1, name: "立减和折扣" }
]);

const consumeDate = ref([
  { id: 1, state: true, name: "今日", value: "today" },
  { id: 2, state: false, name: "昨日", value: "yesterday" },
  { id: 3, state: false, name: "本月", value: "current_month" },
  { id: 4, state: false, name: "本年", value: "current_year" }
]);

onMounted( async () => {
  await handleGetManager()
  handleGetStaticsData({ time_frame: timeFrame.value });
});

// 已消耗金额 水波图的值
const spikeRate: number = computed(() => {
  // if (totalBudget.value > 0) {
  //   return total_consumption.value / totalBudget.value    // 计算百分比，并乘以100转换为百分比形式
  // } else {
  //   return 0; // 如果总预算为0，则返回0%
  // }
});

const handleGetStaticsData = (data) => {
  getStaticsData(data).then((res) => {
    if (res.code !== 0) {
      errorCode(res)
    } else {
      staticsData.value = res.data;
    }
  });
};

const handleAction = data => {
  timeFrame.value = data.value;
  consumeDate.value.forEach(item => {
    item.state = item.id === data.id;
  });
  handleGetStaticsData({ time_frame: timeFrame.value });
};

const selectItem = (item: object) => {
  selectedItem.value = item.name; // 更新选中的项目
  isDropdownVisible.value = false; // 关闭下拉菜单
};

const handleGetManager = async () => {
  const token = getToken()
  if (token){
    await getManager().then(res=>{
      if (res.code !== 0){
        errorCode(res)
      }else{
        useInfo.userInfo = res.data
      }
    })
  }
}
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
