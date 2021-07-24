<template>
  <section class="app-header main-layout full">
    <div class="header-container">
      <button @click="toggleNav" class="header-nav-humburger">☰</button>
      <nav>
        <router-link class="logo-container" to="/"
          ><span class="logo"></span
          ><span class="logo-text">FurrFriends</span></router-link
        >
      </nav>
      <nav class="header-nav-wide">
        <div
          class="right-side-nav"
          :class="{ 'right-side-nav-display': isNavOpen }"
        >
          <router-link @click.native="toggleNav" to="/pet">Search</router-link>
          <router-link @click.native="toggleNav" to="/about">About</router-link>
        </div>
        <div class="user-login" v-if="!loggedinUser">
          <button @click="openUserModal()">Login/Signup</button>
        </div>

        <div class="user-login" @click="openUserModal()" v-else>
          <button class="user-name-avatar">
            {{ loggedinUser.username }}
          </button>
        </div>
      </nav>
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
    return {
      isNavOpen: false,
    };
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
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
  },
};
</script>
