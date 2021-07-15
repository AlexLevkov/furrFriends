<template>
  <section class="app-home main-layout">    
    <img src="../assets/images/hero.jpg" />
    <!-- <pet-app></pet-app> -->
    <pet-list :pets="pukiPets" :isHomepage="true"></pet-list>
    <pet-list :pets="mukiPets" :isHomepage="true"></pet-list>
    <pet-list :pets="otherPets" :isHomepage="true"></pet-list>
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
