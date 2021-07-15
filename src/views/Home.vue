<template>
  <section class="app-home main-layout">
    <h2>HOME SWEET HOME</h2>
    <img src="../assets/images/hero.jpg" />
    <!-- <pet-app></pet-app> -->
    <pet-list :pets="pukiPets"></pet-list>
    <pet-list :pets="mukiPets"></pet-list>
    <pet-list :pets="otherPets"></pet-list>
  </section>
</template>

<script>
import petApp from "./pet-app.vue";
import petList from "../cmps/pet-list.vue";
export default {
  name: "app-home",
  components: {
    petApp,
    petList,
  },
  props: {},
  created() {},
  data() {
    return {};
  },
  computed: {
    pukiPets() {
      return this.$store.getters.pukiPets;
    },
    mukiPets() {
      return this.$store.getters.mukiPets;
    },
    otherPets() {
      return this.$store.getters.otherPets;
    },
  },
  methods: {},
};
</script>
