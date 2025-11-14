<template>
  <div>
    <header class="sm:fixed flex flex-row w-full max-sm:justify-between min-h-16 max-sm:relative overscroll-none dark:bg-gray-600 bg-slate-400 border-b border-gray-700 dark:border-gray-300">
      <Sidebar :sidebar="sidebar" @update:sidebar="sidebar = $event" @close-sidebar="sidebar = false"/>
    </header>
    <main class="min-h-screen transition-all duration-50 max-sm:pt-2 sm:pt-16" :class="{ 'ml-64 max-sm:overflow-hidden max-sm:h-screen max-sm:hidden': sidebar }">
      <div class="mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#app";
import { ref } from "vue";

const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

const sidebar = ref<boolean>(false);


</script>
