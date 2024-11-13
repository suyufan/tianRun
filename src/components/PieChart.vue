<template>
  <div ref="chartRef" class="pie-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps<{
  data: Array<{ value: number; name: string; color?: string }>;
  title?: string;
}>();

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const initializeChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);

    // 设置扇形图的配置项
    const option = {
      title: {
        text: formatTitle(props.title),
        left: "center",
        top: "center",
        textStyle: {
          rich: {
            // 定义“天”或其他黑色字体的样式
            black: {
              color: "#000",
              fontSize: 18,
            },
            // 定义蓝色字体样式
            blue: {
              color: "#0000ff",
              fontSize: 26,
            },
            // 定义灰色、小号字体的样式
            graySmall: {
              color: "#888888",
              fontSize: 14,
            },
            // 占位符样式，用于调整间距
            spacer: {
              fontSize: 10, // 占位符字体大小控制行间距
              lineHeight: 10, // 具体行间距
            },
          },
        },
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "center",
        bottom: "0",
        itemWidth: 10, // 设置图例标识符的宽度
        itemHeight: 10, // 设置图例标识符的高度，使其变成正方形
        itemStyle: {
          borderRadius: "50%", // 将边角半径设为一半，形成圆形 bug: 没生效
        },
        // 自定义图列文字
        textStyle: {
          fontSize: 18,
        },

        formatter: (name: string) => {
          const item = props.data.find((d) => d.name === name);
          if (props.title === "共计1838天") {
            return item ? `${name}: ${item.value}天` : name;
          } else {
            return item
              ? `${name}: ${item.value}万元 占比${(
                  (item.value / totalValue()) *
                  100
                ).toFixed(2)}%`
              : name;
          }
        },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          padAngle: 2,
          data: props.data.map((item) => ({
            ...item,
            itemStyle: {
              borderRadius: 1, //扇形圆角
              color: item.color, // 若未指定颜色则使用默认颜色
            },
          })),
          label: {
            show: false,
          },
        },
      ],
    };

    // 使用配置项设置图表
    chartInstance.setOption(option);
  }
};

// 计算数据总和，供图例的百分比显示使用
const totalValue = () => props.data.reduce((sum, item) => sum + item.value, 0);

// 格式化标题内容的函数
const formatTitle = (text) => {
  if (text.includes("共计")) {
    // 情况 1：标题包含“共计”，例如“共计183天”
    const value = text.match(/\d+/)[0];
    return `{black|共计}{blue|${value}}{black|天}`;
  } else if (text.includes("万元 项目合同额")) {
    // 情况 2：标题包含“万元 项目合同额”
    const amount = text.split("万元")[0];
    return `{black|${amount}万元}\n{spacer| }\n{graySmall|项目合同额}`;
  }
  return text;
}

// 当 data 属性发生变化时，更新图表
watch(
  () => props.data,
  (newData) => {
    if (chartInstance) {
      chartInstance.setOption({
        series: [{ data: newData }],
      });
    }
  },
  { deep: true }
);
watch(
      () => props.title,
      (newData) => {
        initializeChart();
      }
    );

// 挂载和卸载时，初始化和销毁图表
onMounted(() => {
  initializeChart();
  window.addEventListener("resize", resizeChart);
});
onUnmounted(() => {
  chartInstance?.dispose();
  window.removeEventListener("resize", resizeChart);
});

const resizeChart = () => {
  chartInstance?.resize();
};
</script>

<style scoped>
.pie-chart {
  width: 50%;
  height: 400px;
  float: left;
  top: -30px;
}
</style>
