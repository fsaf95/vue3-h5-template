<template>
  <div class="my-[30px] box-border">
    <div class="w-full">
      <!-- 表格头部 -->
      <div>
        <div
          class="px-[20px] py-[10px] text-[26px] text-[#333333] flex justify-between"
        >
          <div class="w-[15%] text-left">姓名</div>
          <div class="w-[25%] text-center">手机号</div>
          <div class="w-[20%] text-center">领券状态</div>
          <div class="w-[20%] text-center">金额(元)</div>
          <div class="w-[30%] text-right">领券时间</div>
        </div>
      </div>
      <!-- 表格内容 -->
      <div
        v-for="(item, index) in props.allData"
        :key="index"
        class="my-[10px] py-[10px] px-[20px] bg-[#f2f2f2] flex justify-between overflow-hidden border-[2px] border-[#e0e0e0] border-solid rounded-[10px] text-[#333333] text-[24px]"
      >
        <div class="w-[15%] text-left">{{ item.customer_name }}</div>
        <div class="w-[25%] text-center">{{ item.customer_mobile }}</div>
        <div class="w-[20%] text-center text-[#ff4343]">
          <!--          {{ item.obtain_status === 1 ? "未领取" : "已领取" }}-->
          {{ item.obtain_status }}
        </div>
        <div class="w-[20%] text-center">{{ item.coupon_value }}</div>
        <div class="w-[30%] text-right">{{ item.obtain_time }}</div>
      </div>
    </div>
    <!-- 分页控件 -->
    <div class="flex my-[30px] justify-end">
      <button
        class="mx-[10px] py-[4px] px-[16px] bg-[#e1eaff] border-2 border-[#ff4343] border-solid rounded-[10px]"
        @click="prevPage"
        :disabled="props.current_page === 1"
      >
        上一页
      </button>
      <button
        class="mx-[10px] py-[4px] px-[16px] bg-[#e1eaff] border-2 border-[#ff4343] border-solid rounded-[10px]"
        @click="nextPage"
        :disabled="props.current_page === props.last_page"
      >
        下一页
      </button>
<!--      <span>当前页：{{ props.current_page }} / 总页数：{{ totalPages }}</span>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, computed, defineProps, defineEmits } from "vue";

const props = defineProps<{
  allData: any[];
  total_count: number
  current_page: number
  per_page: number
  last_page: number
}>();

// 发出事件以更新页码
const emit = defineEmits(["pageChanged"]);
// 计算总页数
const totalPages = computed(() => Math.ceil(props.total_count / props.per_page));

// 上一页
function prevPage() {
  if (props.current_page > 1) {
    emit("pageChanged", props.current_page - 1);
  }
}

// 下一页
function nextPage() {
  if (props.current_page < props.last_page) {
    emit("pageChanged", props.current_page + 1);
  }
}
</script>
<style scoped>
/* 样式 */
</style>
