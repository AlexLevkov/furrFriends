<template>
  <section class="pet-filter">
    <label
      >Find pets from a shelter
      <el-select
        v-model="filter.ownerId"
        placeholder="Select Shelter"
        @change="setFilter"
      >
        <el-option
          v-for="user in users"
          :key="user._id"
          :label="user.fullname"
          :value="user._id"
        >
        </el-option>
        <el-option :label="'All Shelters'" :value="'all'"
          >All Shelters</el-option
        >
      </el-select>
    </label>

    <label>
      Select Pet Type:
      <el-select
        v-model="filter.type"
        @change="setFilter"
        placeholder="Select Pet Type"
      >
        <el-option :label="'All Pets'" :value="'all'">All</el-option>
        <el-option :label="'Dog'" :value="'dog'">dog</el-option>
        <el-option :label="'Cat'" :value="'cat'">cat</el-option>
        <el-option :label="'Fish'" :value="'fish'">fish</el-option>
      </el-select>
    </label>
  </section>
</template>

<script>
export default {
  name: "pet-filter",
  components: {},
  props: {},
  created() {
    this.filter = JSON.parse(JSON.stringify(this.$store.getters.filterBy));
  },
  data() {
    return {
      filter: {
        ownerId: "all",
        type: "all",
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
      const filterCopy = JSON.parse(JSON.stringify(this.filter));
      this.$store.commit({ type: "setFilterBy", filterCopy });
    },
  },
};
</script>
