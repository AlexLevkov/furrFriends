<template>
  <section class="app-header main-layout">
    <nav>
      <router-link to="/">furrFriends</router-link> |
      <router-link to="/about">about</router-link>
    </nav>

    <div class="user-login">
      <button @click="openUserModal()">Signup</button>
      <button @click="openUserModal()">Login</button>
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
  computed: {},
  methods: {
    openUserModal(){
      this.$store.commit({type:'toggleUserModal'})
    }
  },
};
</script>
