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
    <div ref="chartInstance" class="w-full h-[600px]"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, markRaw, defineProps, ref, watch, onUnmounted } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill";
import { getStaticsDataByTime } from "@/api";
import { showFailToast } from "vant";
import { errorCode } from "@/utils/utils";

const chartInstance: any = ref(null);
let myChart: echarts.ECharts | null = null;

const actionDate = ref(1);
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
    // {
    //   type: "inside", // 设置为滑动条型式
    //   show: true, // 显示dataZoom组件
    //   start: 0, // 默认显示的起始位置为0
    //   end: 20, // 默认显示的结束位置为100
    //   handleSize: 1, // 滑动条的手柄大小
    //   handleStyle: {
    //     color: "#DCE2E8" // 滑动条的手柄颜色
    //   },
    //   xAxisIndex: [0], // 表示控制第一个x轴
    //   filterMode: "filter" // 设置为filter模式，即数据超过范围时会被过滤掉
    // },
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 1,
      end: 15
    },
    {
      type: 'inside',
      xAxisIndex: [0],
      start: 1,
      end: 15
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
    // {
    //   type: "bar",
    //   name: "消费",
    //   barWidth: "20px",
    //   data: [120, 322, 412, 80, 533, 43, 130]
    // }
  ]
});
const timeFrame = ref("past_7_days");
const consumeDate = ref([
  { id: 1, state: true, name: "最近7天", value: "past_7_days" },
  { id: 2, state: false, name: "本月", value: "current_month" },
  { id: 3, state: false, name: "本年", value: "current_year" }
]);

const dataArr = ref([]);

onMounted(async () => {
  await handleGetStaticsDataByTime({ time_frame: timeFrame.value });

  if (chartInstance.value) {
    handleEcharts()
  }
});

onUnmounted(() => {
  if (myChart) {
    window.removeEventListener("resize", resizeChart);
    myChart.dispose(); // 清理ECharts实例，释放内存
    myChart = null;
  }
});

// 渲染图表
const handleEcharts = () => {
  myChart = echarts.init(chartInstance.value); // 获取图表
  myChart.setOption(option.value); // 设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过 setOption 完成，ECharts 会合并新的参数和数据，然后刷新图表。
  window.addEventListener("resize", resizeChart);
}

const handleAction = async (data) => {
  actionDate.value = data.value;
  await handleGetStaticsDataByTime({time_frame:actionDate.value})
  myChart.setOption(option.value);
  consumeDate.value.forEach(item => {
    item.state = item.id === data.id;
  });
};

const resizeChart = () => {
  if (myChart) {
    myChart.resize();
  }
};

const handleGetStaticsDataByTime = async (data) => {
  await getStaticsDataByTime(data).then((res) => {
    if (res.code !== 0) {
      errorCode(res)
    } else {
      dataArr.value = res.data;
      option.value.xAxis.data = dataArr.value.map(item => item.show_date); // 日期
      option.value.series[1].data = dataArr.value.map(item => item.verification_amount); // 核销金额的数据
      option.value.series[0].data = dataArr.value.map(item => item.consumption_amount); // 消耗金额的数据
    }
  }).catch();
};
</script>

<style scoped lang="less">
.consume-date-tabbed {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 380px;

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
