<template>
  <div>
    <TitleCard title="项目节点" class="project-card__100"><StateStep :data="node"></StateStep></TitleCard>
    <TitleCard title="项目概况" class="project-card__50"
      ><PieChart :data="overviewDay.data" :title="overviewDay.title"></PieChart>
      <PieChart
        :data="overviewMoney.data"
        :title="overviewMoney.title"
      ></PieChart>
    </TitleCard>
    <TitleCard title="项目成本" class="project-card__50">
      <ProTable :tableData="tableData" :columns="tableColumns"></ProTable>
    </TitleCard>
  </div>
</template>

<script lang="ts" setup>
import TitleCard from "./components/TitleCard.vue";
import StateStep from "./components/StateStep.vue";
import PieChart from "./components/PieChart.vue";
import ProTable from "./components/ProTable.vue";
import { reactive, onMounted } from "vue";

const data = reactive({});
const node = reactive([]);
const overviewDay = reactive({
  data: [{ value: 1, name: "" }],
  title: "",
});
const overviewMoney = reactive({
  data: [{ value: 1, name: "" }],
  title: "",
});
const tableData = reactive([]);
const tableColumns = reactive([]);

onMounted(async () => {
  const response = await fetch("../../public/mock-data/project.json");
  const data = await response.json();
  console.log("data", data["status-list"]);
  Object.assign(node, data["status-list"]);
  Object.assign(overviewDay, data["overview-days"]);
  Object.assign(overviewMoney, data["overview-money"]);
  Object.assign(tableData, data["costList"]);
  Object.assign(tableColumns, data["tableColumns"]);
});
</script>

<style scoped lang="scss">
.project-card__100{
  width: 100%;
}
.project-card__50{
  box-sizing: border-box;
  width: 50%;
  float: left;
  height: 100%;
}
</style>
