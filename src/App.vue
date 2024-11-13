<script setup>
import OverPanel from "./OverPanel.vue";
import { ref, watchEffect } from "vue";

const isDarkMode = ref(false);

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.setAttribute(
    "data-theme",
    isDarkMode.value ? "dark" : "light"
  );
}

watchEffect(() => {
  document.documentElement.setAttribute(
    "data-theme",
    isDarkMode.value ? "dark" : "light"
  );
});
</script>

<template>
  <div>
    <el-button @click="toggleTheme">切换主题</el-button>
    <OverPanel style="width: 100%" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}

.el-button {
  color: white;
  background-color: var(--primary-color);
}
</style>
