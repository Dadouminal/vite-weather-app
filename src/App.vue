<template>

  <div class="flex flex-col min-h-screen font-Poppins bg-weather-primary">
    <SiteNav />

    <RouterView v-slot="{Component}">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
    </RouterView>
  </div>
</template>

<script setup>
import SiteNav from "./components/SiteNav.vue";
import { RouterView } from "vue-router";

</script>
<style>
.page-enter-active,.page-leave-active{
  transition:600ms ease all;
}

.page-enter-from,.page-leave-to{
  opacity: 0;
}

</style>
