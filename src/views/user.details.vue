<template>
  <section class="user-details main-layout min-height" v-if="user">
    <div>
      <h2>Hello {{ user.fullname }}</h2>
      <img src="../assets/images/user.png" />
      <h3>About</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
        asperiores quos cum nostrum fuga nulla delectus. Tempore delectus, ad
        accusantium expedita exercitationem repellendus. Nisi ad, obcaecati ipsa
        ipsum impedit asperiores!
      </p>
      {{ user }}
      <button @click="toggleForm">Add pet</button>
      <form v-if="isFormOpen" @submit.prevent="addPet">
        <input type="text" v-model="petToAdd.name" placeholder="Pet name" />
        <button>add</button>
      </form>
    </div>
  </section>
</template>

<script>
import { userService } from "../service/user.service.js";
export default {
  name: "user-details",
  components: {},
  props: {},
  created() {
    const { userId } = this.$route.params;
    userService.getById(userId).then((user) => {
      this.user = user;
    });
  },
  data() {
    return {
      user: null,
      isFormOpen: false,
      petToAdd: {
        name: "",
      },
    };
  },
  computed: {},
  methods: {
    toggleForm() {
      this.isFormOpen = !this.isFormOpen;
    },
    addPet() {
      const petToAdd = {
        name: this.petToAdd.name,
        owner: {
          fullname: this.user.fullname,
          _id: this.user._id,
        },
      };
      this.$store.dispatch({ type: "savePet", petToAdd }).then(() => {
        this.petToAdd.name = "";
        this.toggleForm();
      });
    },
  },
};
</script>

