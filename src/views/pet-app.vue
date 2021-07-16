<template>
  <section class="pet-app main-layout min-height">
    <pet-filter @filterBy="setFilter"></pet-filter>
    <pet-list :pets="petsToShow"></pet-list>
  </section>
</template>

<script>
import petList from "@/cmps/pet-list";
import petFilter from "@/cmps/pet-filter";
export default {
  name: "pet-app",
  components: {
    petList,
    petFilter,
  },
  props: {},
  created() {},
  data() {
    return {};
  },
  computed: {
    petsToShow() {
      return this.$store.getters.petsToShow;
    },
  },
  methods: {
    setFilter(filter) {
      const newFilter = JSON.parse(JSON.stringify(filter));
      this.$store.commit({ type: "setFilterBy", newFilter });
    },
  },
};
</script>
