<template>
  <el-table :data="props.tableData" style="width: 100%">
    <template v-for="(column, index) in props.columns" :key="index">
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :align="column.align || 'center'"
        :width="column.width"
      >
        <!-- 插槽：允许外部定义内容 -->
        <template v-slot="scope">
          <slot :name="`column-${column.prop}`" v-bind="scope">
            <span v-if="column.prop === 'index'" class="table-columns__index">
              <span>{{ scope.row[column.prop] }}</span>
            </span>
            <span v-else-if="column.prop === 'name'">
              {{ scope.row[column.prop] }}
              <LargeProcess
                :percentage="formatProcess(scope.row.proportion)"
                :color="scope.row.color"
                :textColor="scope.row.textColor"
              ></LargeProcess>
            </span>
            <span
              v-else-if="column.prop === 'amount'"
              class="table-columns__blue"
            >
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
  columns: Array<{
    label: string;
    prop: string;
    align: string;
    width?: number;
  }>;
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

// 合并单元格方法
function tableSpanMethod({ row, column, rowIndex, columnIndex }) {
  if (props.columns[columnIndex].prop === "name") {
    return [1, 3]; // 跨越费用类型、费用金额和占比列
  }
}
</script>

<style lang="scss">
.table-columns__index {
  width: 30px;
  height: 30px;
  display: flex;
  border-radius: 50%;
  background: var(--shadow-background);
  margin: auto;
  span {
    margin: auto;
  }
}

.el-table th {
    background-color: var(--table-header-background) !important;
    color: var(--table-header-color) !important;
}

.el-table__inner-wrapper {
  color: var(--table-text-color);
  background-color: var(--table-background-color) !important;
}

.table-columns__blue {
  color: var(--primary-color);
}

.el-table td.el-table__cell div {
  font-size: 16px;
}
.el-table tr {
  font-size: 18px;
}
@media (max-width: 1200px) {
  .el-table td.el-table__cell div {
    font-size: 14px;
  }
  .el-table tr {
    font-size: 16px;
  }
}
@media (max-width: 980px) {
  .el-table td.el-table__cell div {
    font-size: 12px;
  }
  .el-table tr {
    font-size: 14px;
  }
}
</style>
