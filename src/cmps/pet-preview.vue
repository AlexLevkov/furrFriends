<template>
  <section class="pet-preview">
    <article class="pet-card" @click="showPetDetails(pet._id)">
      <h3>{{ pet.name }}</h3>
      <img src="../assets/images/cat-logo.gif" />
      <div v-if="isUserPre">
        <button @click.stop="editPet">Edit</button>
        <button @click.stop="removePet">Delete</button>
      </div>
      <button v-else @click.stop="goToUser(pet.owner._id)">
        Owend By: {{ pet.owner.fullname }}
      </button>
    </article>
  </section>
</template>

<script>
export default {
  name: "pet-preview",
  components: {},
  props: {
    pet: {
      type: Object,
    },
    isUserPre: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    showPetDetails() {
      this.$router.push({
        name: "pet-details",
        params: { petId: this.pet._id },
      });
    },
    goToUser(ownerId) {
      this.$router.push(`/user/${ownerId}`);
    },
    removePet() {
      this.$store.dispatch({ type: "removePet", petId: this.pet._id });
    },
    editPet(){      
      const petToEdit = JSON.parse(JSON.stringify(this.pet))
      this.$emit('edit', petToEdit)
    }
  },
};
</script>
