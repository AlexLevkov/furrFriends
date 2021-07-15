<template>
  <section class="pet-preview">
    PETS PREVIEW
    <article class="pet-card">
      {{ pet.name }}
      {{ pet._id }}
      <button @click="petDetails">pet details btn</button>
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
    petDetails() {
      console.log("pet details");
      this.$router.push(`./pet/${this.pet._id}`);
    },
  },
};
</script>
