<template>
  <el-steps
    style="max-width: 600px"
    :space="200"
    :active="2"
    finish-status="success"
  >
    <el-step
      v-for="(item, index) in data"
      :key="item.status"
      :title="item.status"
      :icon="item.icon"
      :description="item.date"
    ></el-step>
  </el-steps>
</template>

<script lang="ts" setup>
// 自定义Step
defineProps(["data"]);
</script>
  
<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
</style>