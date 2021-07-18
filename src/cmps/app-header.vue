<template>
  <section class="app-header main-layout">
    <div class="header-container">
      <nav>
        <router-link class="logo-container" to="/"
          ><span class="logo"></span
          ><span class="logo-text">FurrFriends</span></router-link
        >
        <router-link to="/pet">Search</router-link>
        <router-link to="/about">About</router-link>
      </nav>

      <div class="user-login" v-if="!loggedinUser">
        <button @click="openUserModal()">Signup</button>
        <button @click="openUserModal()">Login</button>
      </div>
      <div class="user-login" v-else>
        <router-link :to="'/user/' + loggedinUser._id">{{
          loggedinUser.fullname
        }}</router-link>
        <button @click="openUserModal()">Logout</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "app-header",
  components: {},
  props: {},
  created() {},
  data() {
    return {};
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    openUserModal() {
      this.$store.commit({ type: "toggleUserModal" });
    },
  },
};
</script>
