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
        <el-option :label="'Dog'" :value="'dog'">Dog</el-option>
        <el-option :label="'Cat'" :value="'cat'">Cat</el-option>
        <el-option :label="'Fish'" :value="'fish'">Fish</el-option>
        <el-option :label="'Rabbit'" :value="'rabbit'">Rabbit</el-option>
      </el-select>
    </label>
    <label>
      Select Pet Male/Female:
      <el-select
        v-model="filter.gender"
        @change="setFilter"
        placeholder="Select Pet Male/Female"
      >
        <el-option :label="'All'" :value="'all'">All</el-option>
        <el-option :label="'Male'" :value="'male'">Male</el-option>
        <el-option :label="'Female'" :value="'female'">Female</el-option>
      </el-select>
    </label>
    <label>
      Select Pet Size:
      <el-select
        v-model="filter.size"
        @change="setFilter"
        placeholder="Select Pet Size"
      >
        <el-option :label="'All'" :value="'all'">All</el-option>
        <el-option :label="'Small'" :value="'small'">Small</el-option>
        <el-option :label="'Big'" :value="'big'">Big</el-option>
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
  destroyed() {
    this.filter = {
      ownerId: "all",
      type: "all",
      gender: "all",
      size: "all",
    };
    this.setFilter();
  },

  data() {
    return {
      filter: {
        ownerId: "all",
        type: "all",
        gender: "all",
        size: "all",
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
  watch: {
    "$route.params": {
      immediate: true,
      handler() {
        this.filter = {
          ownerId: "all",
          type: "all",
          gender: "all",
          size: "all",
        };
        this.setFilter();
      },
    },
  },
};
</script>
