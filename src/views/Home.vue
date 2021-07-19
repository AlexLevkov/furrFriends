<template>
  <section class="app-home main-layout min-height">
    <div class="hero">
      <div class="slogan">
        <h2>Adoption makes at least</h2>
        <h2>two lives happier</h2>
      </div>
      <img src="../assets/images/hero.jpg" />
    </div>
    <pet-list :pets="sortedByLikes" :isHomepage="true"></pet-list>
    <pet-list :pets="shelter1Pets" :isHomepage="true"></pet-list>
    <pet-list :pets="shelter2Pets" :isHomepage="true"></pet-list>
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
    sortedByLikes() {
      return this.$store.getters.sortedByLikes;
    },
    shelter1Pets() {
      return this.$store.getters.shelter1Pets;
    },
    shelter2Pets() {
      return this.$store.getters.shelter2Pets;
    },
  },
  methods: {},
};
</script>
