<template>
  <div class="my-[30px] box-border">
    <div class="w-full">
      <!-- 表格头部 -->
      <div>
        <div
          class="px-[20px] py-[10px] text-[26px] text-[#333333] flex justify-between"
        >
          <div class="w-[10%] text-left">姓名</div>
          <div class="w-[25%] text-center">手机号</div>
          <div class="w-[20%] text-center">领券状态</div>
          <div class="w-[20%] text-center">金额(元)</div>
          <div class="w-[25%] text-right">领券时间</div>
        </div>
      </div>
      <!-- 表格内容 -->
      <div
        v-for="(item, index) in currentPageData"
        :key="index"
        class="my-[10px] py-[10px] px-[20px] bg-[#f2f2f2] flex justify-between overflow-hidden border-[2px] border-[#e0e0e0] border-solid rounded-[10px] text-[#333333]"
      >
        <div class="w-[10%] text-left">{{ item.name }}</div>
        <div class="w-[25%] text-center">{{ item.phone }}</div>
        <div class="w-[20%] text-center text-[#ff4343]">
          {{ item.couponStatus === 1 ? "未领取" : "已领取" }}
        </div>
        <div class="w-[20%] text-center">{{ item.amount }}</div>
        <div class="w-[25%] text-right">{{ item.couponTime }}</div>
      </div>
    </div>
    <!-- 分页控件 -->
    <div class="flex my-[30px] justify-end">
      <button
        class="mx-[10px] py-[4px] px-[16px] bg-[#e1eaff] border-2 border-[#ff4343] border-solid rounded-[10px]"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        上一页
      </button>
      <button
        class="mx-[10px] py-[4px] px-[16px] bg-[#e1eaff] border-2 border-[#ff4343] border-solid rounded-[10px]"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        下一页
      </button>
      <!--      <span>当前页：{{ currentPage }} / 总页数：{{ totalPages }}</span>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, computed, defineProps } from "vue";

const props = defineProps<{
  allData: any;
}>();

const listData = toRef(props, "allData");

const pageSize = ref(10); // 每页显示的数据条数
const currentPage = ref(1); // 当前页码

// 计算当前页的数据
const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return listData.value.slice(start, end);
});

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(listData.value.length / pageSize.value);
});

// 上一页
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

// 下一页
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}
</script>
<style scoped>
/* 样式 */
</style>
