<template>
  <section class="app-home main-layout min-height">
    <img src="../assets/images/hero.jpg" />
    <!-- <pet-app></pet-app> -->
    <pet-list :pets="shelter1Pets" :isHomepage="true"></pet-list>
    <pet-list :pets="shelter2Pets" :isHomepage="true"></pet-list>
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
    shelter1Pets() {
      return this.$store.getters.shelter1Pets;
    },
    shelter2Pets() {
      return this.$store.getters.shelter2Pets;
    },
    otherPets() {
      return this.$store.getters.otherPets;
    },
  },
  methods: {},
};
</script>
