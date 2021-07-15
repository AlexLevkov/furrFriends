<template>
  <section class="pet-filter">
    FILTER
    <input v-model="filter.text" @change="search" type="search" />
    {{ filter.text }}
  </section>
</template>

<script>
export default {
  name: "pet-filter",
  components: {},
  props: {},
  created() {},
  data() {
    return {
      filter: {
        text: "",
      },
    };
  },
  computed: {},
  methods: {
    search() {
      this.$emit("filterBy", this.filter);
    },
  },
};
</script>
