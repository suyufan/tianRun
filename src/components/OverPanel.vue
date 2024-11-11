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
    <TitleCard title="项目成本"
      >一个Table Table(序号，费用类型，费用金额，占比)<LargeProcess
      ></LargeProcess
    ></TitleCard>
  </div>
</template>

<script lang="ts" setup>
import TitleCard from "./TitleCard.vue";
import LargeProcess from "./LargeProcess.vue";
import StateStep from "./StateStep.vue";
import PieChart from "./PieChart.vue";
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

onMounted(async () => {
  const response = await fetch("../../public/mock-data/project.json");
  const data = await response.json();
  console.log("data", data["status-list"]);
  Object.assign(node, data["status-list"]);
  Object.assign(overviewDay, data["overview-days"]);
  Object.assign(overviewMoney, data["overview-money"]);
});
</script>
  
<style scoped>
</style>
  