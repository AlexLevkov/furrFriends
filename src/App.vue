<template>
  <div id="app">
    <app-header></app-header>
    <user v-show="isUserModal" class="user-modal"></user>
    <router-view />
    <pet></pet>
  </div>
</template>

<script>
import appHeader from "./cmps/app-header.vue";
import user from "./cmps/user.vue";
import pet from "./views/pet.vue";
export default {
  components: {
    appHeader,
    user,
    pet,
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




