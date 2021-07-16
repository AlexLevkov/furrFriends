<template>
  <section class="pet-list">    
    <ul class="pet-preview-container">
      <li v-for="pet in pets" :key="pet._id">
        <pet-preview :pet="pet"></pet-preview>
      </li>
    <button class="see-more" v-if="isHomepage" @click="goToOwnersPets">See more...</button>
    </ul>
  </section>
</template>

<script>
import petPreview from "./pet-preview.vue";
export default {
  name: "pet-list",
  components: {
    petPreview,
  },
  props: {
    pets: {
      type: Array,
    },
    isHomepage:{
      type: Boolean,
      default: false,
    }
  },
  created() {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    goToOwnersPets(){
     const filterCopy = {
        ownerId: this.pets[0].owner._id
      }
      this.$store.commit({ type: "setFilterBy", filterCopy });
      this.$router.push('/pet')
    }
  },
};
</script>
