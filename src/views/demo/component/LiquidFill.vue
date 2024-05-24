<template>
  <div ref="chartInstance" class="w-full h-[250px]"></div>
</template>

<script lang="ts" setup>
import { toRef,watch, onMounted, defineProps, ref, onUnmounted } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill";

interface Props {
  sliderValue?: number;
  height?: number;
  label?: Boolean;
}

const props = defineProps<Props>();
const slider_value = toRef(props, "sliderValue");
const chartInstance: any = ref(null);
let myChart: echarts.ECharts | null = null;
// 设置图表的配置项和数据
const option = ref({
  series: [
    {
      name: "自定义盒子",
      type: "liquidFill",
      phase: 1,
      amplitude: 4,
      data: [
        {
          value: 0.7,
          itemStyle: {
            color: "#136CEA"
          }
        }
        // {
        //   value: 0.4,
        //   itemStyle: {
        //     color: "#4D8EE8"
        //   }
        // }
      ],
      shape: "circle",
      radius: "96%",
      // color: ["#C23531", "#fff", "red"], // 调色板，每一个波浪颜色在这里取值,
      center: ["50%", "50%"], // 图形中心坐标
      // 波浪颜色
      itemStyle: {
        opacity: 0.8, // 透明度
        color: "burl", // 统一配置水波的颜色
        shadowBlur: 5 // 水波阴影大小
        // shadowColor: "burl", // 阴影颜色
        // shadowOffsetX: 10, // 阴影水平偏移量
        // shadowOffsetY: 10 // 阴影竖直偏移量
      },
      // 水波图背景颜色
      backgroundStyle: {
        borderWidth: 4, // 背景边框宽度
        color: "rgba(5, 108, 252, 0.1)", // 指定背景颜色
        borderColor: "#056CFC", // 背景边框颜色，默认 none
        shadowBlur: 0, // 背景阴影模糊大小，默认为0
        shadowColor: "none", // 背景阴影颜色，默认为无色
        shadowOffsetX: 0, // 背景阴影水平偏移，默认为0
        shadowOffsetY: 0 // 背景阴影垂直偏移，默认为0
      },
      // 水波图边框配置
      outline: {
        show: false // 是否显示边框，默认为false
        // borderDistance: 10, // 边框距离水波图的距离，默认为0，也可以理解为边框宽度
        // 边框样式
        // itemStyle: {
        //   color: "none", // 边框距离水波图以及边框的背景颜色颜色
        //   borderWidth: 3, // 图例图形的描边
        //   borderColor: "rgba(40, 36, 36, 1)", // 图例图形描边的颜色
        //   borderType: "dashed", // 图例图形描边线的类型可以是 'solid'（实线）、'dashed'（虚线）或 'dotted'（点线），默认为 'solid'
        //   borderDashOffset: 10, // 图例图形描边虚线的位移量
        //   shadowBlur: 2.5, // 图例的阴影模糊大小
        //   shadowColor: "rgba(228, 2, 2, 1)", // 图例图形阴影颜色
        //   shadowOffsetX: -1.5, // 图例图形阴影水平偏移量
        //   shadowOffsetY: 1.5, // 图例图形阴影竖直偏移量
        //   opacity: 0.5 // 图例图形的透明度
        // }
      },
      // 水波图标签配置
      label: {
        show: false, // 是否显示标签，默认为 false
        position: "inside", // 标签的位置，可以是 'inside'（内部）、'left'、'right'、'top'、'bottom' 或具体的像素值，默认为 'inside'
        baseline: "center", // 设置标签居中对齐 "top"、"bottom" 或 "center"
        align: "center", // 水平对齐方式 "left" 或 "right"
        distance: 50,
        color: "#000", // 标签的颜色
        insideColor: "white", // 与波浪覆盖时的颜色
        fontSize: 16, // 标签的字体大小，默认为 12
        // fontWeight: "normal", // 标签的字体粗细，可以是 'normal' 或 'bold'，默认为 'normal'
        // fontFamily: "sans-serif", // 标签的字体类型，默认为 'sans-serif'
        // formatter: null, // 格式化标签文本的回调函数，默认为 null
        // backgroundColor: "none", // 标签的背景颜色，默认为无色
        // borderRadius: 0, // 标签的圆角半径，默认为 0
        // borderColor: "none", // 标签的边框颜色，默认为无色
        // borderWidth: 0, // 标签的边框宽度，默认为 0
        // padding: [0, 0, 0, 0], // 标签内容的内边距，可以是一个数组或单个数值，默认为 [0, 0, 0, 0]
        // shadowBlur: 0, // 标签的阴影模糊大小，默认为 0
        // shadowColor: "none", // 标签的阴影颜色，默认为无色
        // textBorderColor: "red", //文本描边颜色
        // textBorderWidth: 10, //文本描边宽度
        // textBorderType: "solid", //描边类型
        // textBorderDashOffset: 10, //描边为虚线时的偏移量
        // textShadowColor: "transparent", //文字阴影颜色
        // textShadowBlur: 10, //文字阴影长度
        // textShadowOffsetX: 10, //文字阴影水平偏移量
        // textShadowOffsetY: 10, //文字阴影竖直偏移量
        overflow: "none", //文字超出是否截断
        ellipsis: "···" //文字截断时末尾显示内容
        // 文本标签偏移视乎有问题，我这边偏移的只有文本标签的盒子，而显示的内容没有被偏移
        // shadowOffsetX: 20, //文本标签的阴影水平偏移
        // shadowOffsetY: 20 //文本标签的阴影竖直偏移
      }
    }
  ]
})

onMounted(() => {
  if (chartInstance.value) {
    myChart = echarts.init(chartInstance.value);
    option.value.series[0].data[0].value = props.sliderValue
    // 是否展示标签
    if (props.label) {
      option.value.series[0].label.show = true;
    }

    myChart.setOption(option.value);
    window.addEventListener("resize", resizeChart);
  }
});

// 使用 watch 监听 sliderValue 的变化
watch(() => props.sliderValue, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    console.log(138,newValue);
    option.value.series[0].data[0].value = newValue
    myChart.setOption(option.value);
    window.addEventListener("resize", resizeChart);
  }
}, {
  immediate: false, // 是否在初始化时立即调用handler
  deep: false, // 是否深度监听（对象内部属性的变化），对于基本类型通常不需要
});

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

<style scoped></style>
