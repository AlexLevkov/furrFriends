<template>
  <div id="app">
    <app-header />
    <router-view />
    <pet></pet>
  </div>
</template>




<script>
import appHeader from "./cmps/app-header.vue";
import pet from "./views/pet.vue";
export default {
  components: {
    appHeader,
    pet,
  },
  created() {
    this.$store.dispatch({ type: "loadPets" });
  },
};
</script>


