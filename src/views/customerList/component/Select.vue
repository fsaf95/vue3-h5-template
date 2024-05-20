<template>
  <div class="pet-select-container">
    <select
      name="pets"
      id="pet-select"
      v-model="selectedPet"
      @change="handlePetChange"
    >
      <option value="">-- 领取状态 --</option>
      <option v-for="pet in pets" :key="pet.value" :value="pet.value">
        {{ pet.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

// 定义 props
const props = defineProps({
  // 假设父组件可以传入初始选中的宠物值
  initialPet: {
    type: String,
    default: ""
  }
});

// 定义 emit 事件
const emit = defineEmits(["handleSelected"]);

// 响应式数据
const selectedPet = ref(props.initialPet);
const pets = ref([
  { value: "2", label: "已领取" },
  { value: "1", label: "未领取" }
]);

// 监听选中值的变化
// watch(selectedPet, (newVal, oldVal) => {
//   if (newVal !== oldVal) {
//     emit("handleSelected", newVal);
//   }
// });

// 处理宠物改变的方法
function handlePetChange() {
  // 在这里可以添加额外的逻辑
  emit("handleSelected", selectedPet.value);
}
</script>

<style scoped>
select {
  width: 100%;
  padding: 16px 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 26px;
  color: #333333;
  box-sizing: border-box;
}
</style>
