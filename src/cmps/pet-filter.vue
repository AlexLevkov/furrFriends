<template>
  <section class="pet-filter">
    <el-dropdown>
      <el-button type="primary">
        Owner<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu
        v-model="filter.ownerId"
        @change="setFilter"
        slot="dropdown"
      >
        <el-dropdown-item value="all">all</el-dropdown-item>
        <el-dropdown-item
          v-for="user in users"
          :key="user._id"
          :value="user._id"
          >{{ user.fullname }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>

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
