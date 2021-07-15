<template>
  <!-- <section class="pet-details main-layout"> -->
  <section class="main-layout">
    <div class="pet-details">
      <div class="pet-bio">
        {{ pet.name }}'s bio:
        {{ pet.bio }}
      </div>

      <div class="pet-details-grid">
        <article class="img-1">
          <img class="img-details" src="../assets/images/dog/dog-1.jpg" />
        </article>
        <article class="img-2">
          <img class="img-details" src="../assets/images/dog/dog-2.jpg" />
        </article>
        <article class="img-3">
          <img class="img-details" src="../assets/images/dog/dog-3.jpg" />
        </article>
      </div>
    </div>

    <button @click="adoptPet">Adopt</button>
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


