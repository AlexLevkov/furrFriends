<template>
  <div id="app">
    <app-header></app-header>
    <user v-show="isUserModal" class="user-modal"></user>
    <router-view />
  </div>
</template>




<script>
"app";
import appHeader from "./cmps/app-header.vue";
import user from "./cmps/user.vue";
export default {
  components: {
    appHeader,
    user,
  },
  data() {
    return {};
  },
  computed: {
    isUserModal() {
      return this.$store.getters.userModal;
    },
  },
};
</script>


