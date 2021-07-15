<template>
  <section class="user-main main-layout">
    <div class="user-form-container">
        <button @click="closeModal()">X</button>
      <form class="signup-form" @submit.prevent="signup()" v-if="!loggedinUser">
        <h2>Please Signup</h2>
        <input v-model="newUser.fullname" type="text" />
        <input v-model="newUser.username" type="text" />
        <input v-model="newUser.password" type="password" />
        <button>Signup</button>
      </form>
      <form class="login-form" @submit.prevent="login()" v-if="!loggedinUser">
      <h2>Or</h2>
        <select v-model="selectedUsername">
          <option v-for="user in users" :key="user._id">
            {{ user.username }}
          </option>
        </select>
        <input v-model="password" type="password" />
        <button>Login</button>
      </form>

      <div v-if="loggedinUser">
        <button @click="logout">Logout</button>
        {{ loggedinUser }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "user-main",
  components: {},
  props: {},
  created() {
    this.$store.dispatch("loadUsers");
  },
  data() {
    return {
      newUser: {
        fullname: "",
        username: "",
        password: "",
        isAdmin: false,
      },
      selectedUsername: null,
      password: "",
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    signup() {
      if (
        !this.newUser.username ||
        !this.newUser.fullname ||
        !this.newUser.password
      )
        return;
      this.$store
        .dispatch({ type: "signup", userCred: this.newUser })
        .then(() => {
          this.newUser.username = "";
          this.newUser.fullname = "";
          this.newUser.password = "";
        });
    },
    login() {
      const selectedUser = this.users.find(
        (user) => user.username === this.selectedUsername
      );
      selectedUser.password = this.password;
      this.$store
        .dispatch({ type: "login", userCred: selectedUser })
        .then(() => {
          this.selectedUsername = null;
          this.password = "";
        });
    },
    logout() {
      this.$store.dispatch({ type: "logout" });
    },
    closeModal(){
        this.$store.commit({ type: 'toggleUserModal' })
    }
  },
};
</script>
