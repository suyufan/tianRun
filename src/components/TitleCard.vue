<template>
  <el-card class="project-card">
    <template #header>
      <div class="project-card__header">
        <span class="project-card__content">{{ title }}</span>
      </div>
    </template>
    <slot> 萝卜坑 </slot>
  </el-card>
</template>

<script lang="ts" setup>
// 自定义Card面版
defineProps({
  title: String,
});
</script>

<style scoped>
.el-card {
  background-color: var(--background-color);
  color: var(--text-color);
}
.project-card__header {
  font-size: 20px;
  font-weight: 800;
}
@media (max-width: 1200px) {
  .project-card__header {
    font-size: 18px;
    font-weight: 600;
  }
}
@media (max-width: 980px) {
  .project-card__header {
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
