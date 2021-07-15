<template>
  <section class="pet-details">
    PET DETAILS
    {{ pet }}
    <button @click="adoptPet">adopt</button>
  </section>
</template>

<script>
import { petService } from "../service/pet.service.js";
export default {
  name: "pet-details",
  components: {},
  props: {},
  created() {
    this.getPet();
  },
  data() {
    return {
      pet: {},
    };
  },
  computed: {
    petId() {
      return this.$route.params.petId;
    },
  },
  methods: {
    async getPet() {
      try {
        let petId = this.petId;
        let pet = await petService.getById(petId);
        this.pet = pet;
      } catch {
        console.log(err);
      }
    },
    adoptPet() {
      alert("welcome to the family");
    },
  },
};
</script>


