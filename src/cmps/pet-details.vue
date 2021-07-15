<template>
  <section class="pet-details main-layout">
    <div>
      {{ pet }}
      <button @click="adoptPet">Adopt</button>
    </div>
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
    loggedinUser() {
      return this.$store.getters.loggedinUser;
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
      if (this.loggedinUser) {
        alert("Congtraz you are a pet owner!");
      } else {
        this.$store.commit({ type: "toggleUserModal" });
      }
    },
  },
};
</script>


