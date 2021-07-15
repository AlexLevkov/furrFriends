<template>
  <section class="pet-preview">
    PETS PREVIEW
    <article class="pet-preview-card">
      {{ pet.nickname }}
      <button @click="petDetails">X</button>
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
      this.$router.push(`./pet/details/${this.pet._id}`);
    },
  },
};
</script>
