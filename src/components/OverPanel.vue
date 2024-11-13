<template>
  <div>
    <TitleCard title="项目节点"><StateStep :data="node"></StateStep></TitleCard>
    <TitleCard title="项目概况"
      ><PieChart :data="overviewDay.data" :title="overviewDay.title"></PieChart>
      <PieChart
        :data="overviewMoney.data"
        :title="overviewMoney.title"
      ></PieChart>
    </TitleCard>
    <TitleCard title="项目成本">
      <ProTable :tableData="tableData" :columns="tableColumns"></ProTable>
    </TitleCard>
  </div>
</template>

<script lang="ts" setup>
import TitleCard from "./TitleCard.vue";
import StateStep from "./StateStep.vue";
import PieChart from "./PieChart.vue";
import ProTable from "./ProTable.vue";
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

<style scoped></style>
