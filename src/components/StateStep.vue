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
// 自定义Step
defineProps(["data"]);
</script>
  
<style>
.step-line__pending .el-step__head .el-step__line .el-step__line-inner{
  /* transition-delay: 0ms !important;  */
  border-width: 1px !important; 
  width: 50% !important;
}
.el-step__head.is-success {
  border-color: #409eff;
  color: #409eff;
}
.el-step__title.is-success {
  color: #409eff;
}
.el-step__description.is-success {
  color: #409eff;
}
.el-step__head.is-process {
  border-color: #a8abb2;
  color: #a8abb2;
}
</style>