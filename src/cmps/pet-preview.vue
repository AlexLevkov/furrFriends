<template>
  <section class="pet-preview">    
    <article class="pet-card" @click="showPetDetails(pet._id)">
      <h3>{{ pet.name }}</h3>
      <img src="../assets/images/cat-logo.gif">
      <button @click.stop="goToUser(pet.owner._id)">Owend By: {{pet.owner.fullname}} </button>
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
  },
  created() {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    showPetDetails() {      
      this.$router.push(`./pet/${this.pet._id}`);
    },
     goToUser(ownerId){
        this.$router.push(`/user/${ownerId}`);
    }
  },
};
</script>
