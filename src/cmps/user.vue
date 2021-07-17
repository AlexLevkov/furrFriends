<template>
  <section class="user-main main-layout">
    <div class="user-form-container">
      <el-button @click="closeModal()" type="info" circle>X</el-button>
      <form class="signup-form" @submit.prevent="signup()" v-if="!loggedinUser">
        <h2>Please Signup</h2>
        <el-input placeholder="Full name" v-model="newUser.fullname" clearable>
        </el-input>
        <el-input placeholder="User Name" v-model="newUser.username" clearable>
        </el-input>
        <el-input
          placeholder="Password"
          v-model="newUser.password"
          show-password
        ></el-input>
        <el-button @click="signup()" type="success" round>Signup</el-button>
      </form>
      <form class="login-form" @submit.prevent="login()" v-if="!loggedinUser">
        <h2>Or</h2>
        <select v-model="selectedUsername">
          <option v-for="user in users" :key="user._id">
            {{ user.username }}
          </option>
        </select>
        <el-input
          placeholder="Password"
          v-model="password"
          show-password
        ></el-input>
        <el-button @click="login()" type="success" round>Login</el-button>
      </form>

      <div v-if="loggedinUser">
        <el-button @click="logout" type="info" round>Logout</el-button>
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
      this.$store.dispatch({ type: "logout" }).then(() => {
        this.$router.push({ name: "home" });
      });
    },
    closeModal() {
      this.$store.commit({ type: "toggleUserModal" });
    },
  },
};
</script>

