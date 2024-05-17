<template>
  <div class="w-full h-auto bg-white mt-[20px] p-[26px]">
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
    <div
      ref="chartInstance"
      class="w-full"
      :class="getHeightClass(height)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, markRaw, defineProps, ref, watch, onUnmounted } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill";

interface Props {
  sliderValue?: unknown;
  height?: number;
  label?: Boolean;
}

const props = defineProps<Props>();
const chartInstance: any = ref(null);
let myChart: echarts.ECharts | null = null;

const actionId = ref(1);
// 设置图表的配置项和数据
const option = ref({
  legend: {
    type: "plain",
    orient: "horizontal",
    // right: 10,
    top: 20
    // bottom: 20,
  },
  tooltip: {},
  dataZoom: [
    {
      type: "slider", // 设置为滑动条型式
      show: true, // 显示dataZoom组件
      start: 0, // 默认显示的起始位置为0
      end: 20, // 默认显示的结束位置为100
      handleSize: 1, // 滑动条的手柄大小
      handleStyle: {
        color: "#DCE2E8" // 滑动条的手柄颜色
      },
      xAxisIndex: [0], // 表示控制第一个x轴
      filterMode: "filter" // 设置为filter模式，即数据超过范围时会被过滤掉
    }
  ],
  dataset: {
    source: []
  },
  xAxis: {
    type: "category",
    data: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ]
  },
  yAxis: {},
  series: [
    {
      type: "bar",
      name: "消耗",
      barWidth: "20px",
      data: [120, 323, 150, 421, 112, 110, 214]
    },
    {
      type: "bar",
      name: "核销",
      barWidth: "20px",
      data: [35, 42, 421, 534, 53, 213, 421]
    },
    {
      type: "bar",
      name: "消费",
      barWidth: "20px",
      data: [120, 322, 412, 80, 533, 43, 130]
    }
  ]
});

const consumeDate = ref([
  { id: 1, state: true, name: "今日" },
  { id: 2, state: false, name: "本月" },
  { id: 3, state: false, name: "本年" }
]);

const handleAction = data => {
  actionId.value = data.id;
  const dataArrs = dataArr.value[data.id - 1];
  option.value.series.forEach((item, index) => {
    item.data = dataArrs.arr[index].data;
  });
  consumeDate.value.forEach(item => {
    item.state = item.id === data.id;
  });

  myChart.setOption(option.value);
  window.addEventListener("resize", resizeChart);
};

const dataArr = ref([
  {
    id: 1,
    name: "今日",
    arr: [
      { id: 1, name: "消耗", data: [100, 323, 150, 421, 100, 51, 150,154,412,101,42,135] },
      { id: 2, name: "核销", data: [150, 323, 51, 150, 112, 100, 214,154,412,101,42,135] },
      { id: 3, name: "消费", data: [120, 51, 150, 421, 150, 110, 150,154,412,101,42,135] }
    ]
  },
  {
    id: 2,
    name: "本月",
    arr: [
      { id: 1, name: "消耗", data: [152, 323, 825, 421, 650, 51, 825,1021,1542,101,542,145] },
      { id: 2, name: "核销", data: [150, 650, 152, 150, 152, 100, 214,1321,1262,101,542,145] },
      { id: 3, name: "消费", data: [120, 650, 150, 421, 825, 650, 152,1221,1442,101,542,145] }
    ]
  },
  {
    id: 3,
    name: "今年",
    arr: [
      { id: 1, name: "消耗", data: [584, 955, 150, 421, 584, 858, 150] },
      { id: 2, name: "核销", data: [150, 955, 858, 150, 112, 584, 214] },
      { id: 3, name: "消费", data: [120, 858, 150, 421, 858, 110, 150] }
    ]
  }
]);

onMounted(() => {
  if (chartInstance.value) {
    myChart = echarts.init(chartInstance.value);
    myChart.setOption(option.value);
    window.addEventListener("resize", resizeChart);
  }
});

const getHeightClass = height => {
  return height === 200 ? "h-[200px]" : "h-[500px]";
};

onUnmounted(() => {
  if (myChart) {
    window.removeEventListener("resize", resizeChart);
    myChart.dispose(); // 清理ECharts实例，释放内存
    myChart = null;
  }
});

const resizeChart = () => {
  if (myChart) {
    myChart.resize();
  }
};
</script>

<style scoped lang="less">
.consume-date-tabbed {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 360px;

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
