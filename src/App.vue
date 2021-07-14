<template>
  <div id="app">
    <app-header></app-header>
    <router-view />
  </div>
</template>




<script>
"app";
import appHeader from "./cmps/app-header.vue";
export default {
  components: {
    appHeader,
  },
};
</script>


