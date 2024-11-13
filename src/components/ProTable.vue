<template>
  <el-table :data="props.tableData" style="width: 100%">
    <template v-for="(column, index) in props.columns" :key="index">
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :align="column.align || 'center'"
      >
        <!-- 插槽：允许外部定义内容 -->
        <template v-slot="scope">
          <slot :name="`column-${column.prop}`" v-bind="scope">
            <span v-if="column.prop === 'name'">
                {{ scope.row[column.prop] }}
              <LargeProcess
                :percentage="formatProcess(scope.row.proportion)"
                :color="scope.row.color"
                :textColor="scope.row.textColor"
              ></LargeProcess>
            </span>
            <span v-else-if="column.prop === 'amount'">
              {{ formatAmount(scope.row.amount) }}
            </span>
            <span v-else-if="column.prop === 'proportion'">
              {{ formatProportion(scope.row.proportion) }}
            </span>
            <span v-else>
              {{ scope.row[column.prop] }}
            </span>
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts" setup>
import LargeProcess from "./LargeProcess.vue";

const props = defineProps<{
  tableData: Array<{
    index: number;
    name: string;
    amount: number;
    proportion: number;
  }>;
  columns: Array<{ label: string; prop: string; align: string }>;
}>();

const formatAmount = (amount) => {
  return `${(Math.round(amount / 100) / 100).toFixed(2)} 万元`;
};

// 格式化比例为百分比并保留两位小数
const formatProportion = (proportion) => {
  return `${(proportion * 100).toFixed(2)} %`;
};
// 格式化进度条数值
const formatProcess = (proportion) => {
  return Math.round(proportion * 100);
};
</script>
