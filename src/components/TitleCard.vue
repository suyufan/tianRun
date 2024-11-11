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
})
</script>

<style scoped>
/* .el-card :deep() .el-card__header {
    padding: 12px 20px;
} */
.project-card__header {
    font-size: 18px;
    font-weight: 800;
}
</style>