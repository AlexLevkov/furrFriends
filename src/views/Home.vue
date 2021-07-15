<template>
  <section class="app-home main-layout">
    <h2>HOME SWEET HOME</h2>
    <pet-app></pet-app>
  </section>
</template>

<script>
import petApp from "./pet-app.vue";
export default {
  name: "app-home",
  components: {},
  props: {},
  created() {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    petApp,
  },
};
</script>
