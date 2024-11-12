<template>
  <el-progress :percentage="props.percentage" :color="props.color" v-bind="$attrs" :text-inside="true" :stroke-width="22"/>
</template>

<script lang="ts" setup>
// 自定义进度条 Process
const props = defineProps<{
  percentage: number;
  color: string;
}>();
</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
</style>
