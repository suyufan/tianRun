<template>
  <div ref="chartRef" class="pie-chart"></div>
</template>
  
  <script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps<{
  data: Array<{ value: number; name: string }>;
  title?: string;
}>();

console.log("1111",props.title)

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const initializeChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);

    // 设置扇形图的配置项
    const option = {
      title: {
        text: props.title,
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "center",
        bottom: '1%'
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          padAngle: 2,
          data: props.data,
          itemStyle: {
            borderRadius: 1,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
            itemStyle: {
              borderRadius: 1,
            },
          },
        },
      ],
    };

    // 使用配置项设置图表
    chartInstance.setOption(option);
  }
};

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
}
</style>
  