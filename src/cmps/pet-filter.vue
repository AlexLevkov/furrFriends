<template>
  <section class="pet-filter">    
    
    <select v-model="filter.ownerId" @change="setFilter">
      <option value="all">All</option>
      <option v-for="user in users" :key="user._id" :value="user._id">
        {{ user.fullname }}
      </option>
    </select>
    <select v-model="filter.type" @change="setFilter">
      <option value="all">All</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="fish">Fish</option>
    </select>
  </section>
</template>

<script>
export default {
  name: "pet-filter",
  components: {},
  props: {},
  created() {
    this.filter = JSON.parse(JSON.stringify(this.$store.getters.filterBy))
  },
  data() {
    return {
      filter: {        
        ownerId: "all",
        type:'all',
      },
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    search() {
      this.$emit("filterBy", this.filter);
    },
    setFilter() {
      const filterCopy = JSON.parse(JSON.stringify(this.filter))
      this.$store.commit({ type: "setFilterBy", filterCopy });      
    },
  },
};
</script>
