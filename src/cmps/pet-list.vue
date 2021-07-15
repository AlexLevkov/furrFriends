<template>
  <section class="pet-list">    
    <ul class="pet-preview-container">
      <li v-for="pet in pets" :key="pet._id">
        <pet-preview :pet="pet"></pet-preview>
      </li>
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
  },
  created() {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
