<template>
  <div id="app">
    <user v-show="isUserModal" class="user-modal"></user>
    <app-header></app-header>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from "./cmps/app-header.vue";
import appFooter from "./cmps/app-footer.vue";
import user from "./cmps/user.vue";

export default {
  components: {
    appHeader,
    user,
    appFooter,
  },
  created() {
    this.$store.dispatch({ type: "loadPets" });
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




