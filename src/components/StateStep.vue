<template>
  <el-steps
    style="max-width: 1920px"
    :space="384"
    :active="2"
    finish-status="success"
  >
    <el-step
      v-for="(item, index) in data"
      :key="item.status"
      :title="item.status"
      :icon="item.icon"
      :description="item.date"
      :class="item.class"
    ></el-step>
  </el-steps>
</template>

<script lang="ts" setup>
defineProps(["data"]);
</script>
  
<style>
.step-line__pending .el-step__head .el-step__line .el-step__line-inner{
  /* transition-delay: 0ms !important;  */
  border-width: 1px !important; 
  width: 50% !important;
}
/**
 * Step 完成状态样式
 */
.el-step__head.is-success {
  border-color: var(--primary-color);
  color: var(--primary-color);
}
.el-step__title.is-success {
  color: var(--primary-color);
}
.el-step__description.is-success {
  color: var(--primary-color);
}
/**
 * Step 进行中状态样式
 */
 .el-step__head.is-process {
  border-color: var(--gray-color);
  color: var(--gray-color);
}
.el-step__title.is-process {
  color: var(--text-color);
}
.el-step__description.is-process {
  color: var(--text-color);
}
/**
 * Step 等待状态样式
 */
.el-step__title.is-wait {
  color: var(--text-color);
}
.el-step__description.is-wait {
  color: var(--text-color);
}

@media (max-width: 1200px) {
  .el-step__title {
    font-size: 16px;
  }
}
@media (max-width: 980px) {
  .el-step__description {
    font-size: 10px;
  }
  .el-step__title {
    font-size: 14px;
  }
}
</style>