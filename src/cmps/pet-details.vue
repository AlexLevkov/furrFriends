<template>
  <section class="pet-details">PET DETAILS</section>
</template>

<script>
export default {
  name: "pet-details",
  components: {},
  props: {},
  created() {
    this.createPet();
  },
  data() {
    return {
      pet: {},
    };
  },
  computed: {
    toyId() {
      return this.$route.params.petId;
    },
  },
  methods: {
    async createPet() {
      let petId = this.petId;
      let pet = await this.$store.dispatch({ type: "getpet", petId });
      this.pet = pet;
    },
  },
};
</script>
