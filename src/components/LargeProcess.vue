<template>
  <el-progress
    :percentage="props.percentage"
    :color="props.color"
    v-bind="$attrs"
    :text-inside="true"
    :stroke-width="22"
  >
    <template #default>
      <span :style="{ color: textColor }">{{ props.percentage }}%</span>
    </template>
  </el-progress>
</template>

<script lang="ts" setup>
// 自定义进度条 Process
const props = defineProps<{
  percentage: number;
  color?: string;
  textColor?: string;
}>();
</script>

<style>
.el-progress-bar__outer {
  background-color: var(--shadow-background);
}
</style>
