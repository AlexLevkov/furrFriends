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
        <select v-model="petToAdd.type">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="fish">Fish</option>
          <option value="snake">Snake</option>
        </select>
        <label>
          <input type="radio" value="male" v-model="petToAdd.gender" />
          Male
        </label>
        <label>
          <input type="radio" value="female" v-model="petToAdd.gender" />
          Female
        </label>
        <label>
          Age
          <input type="number" v-model="petToAdd.age" />
        </label>
        <select v-model="petToAdd.size">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <label>
          Vaccinated
          <input type="checkbox" v-model="petToAdd.isVaccinated" />
        </label>
        <label>
          Safe With Children
          <input type="checkbox" v-model="petToAdd.isSafeWithChild" />
        </label>
        <label>
          Playfull
          <input type="checkbox" v-model="petToAdd.isPlayfull" />
        </label>
        <select v-model="petToAdd.trainedLevel">
          <option value="none">None</option>
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
        </select>

        <button>add</button>
      </form>
      <pet-list :isUserPre="isLoggedinUser" :pets="usersPets"></pet-list>
    </div>
  </section>
</template>

<script>
import { userService } from "../service/user.service.js";
import { petService } from "../service/pet.service.js";
import petList from "../cmps/pet-list.vue";
export default {
  name: "user-details",
  components: {
    petList,
  },
  props: {},
  created() {
    const { userId } = this.$route.params;
    userService.getById(userId).then((user) => {
      this.user = user;
    });
    this.petToAdd = petService.getEmptyPet();
  },
  data() {
    return {
      user: null,
      isFormOpen: false,
      petToAdd: null,
    };
  },
  computed: {
    usersPets() {
      return this.$store.getters.petsToShow.filter(
        (pet) => pet.owner._id === this.user._id
      );
    },
    isLoggedinUser() {
      return this.$store.getters.loggedinUser._id === this.user._id;
    },
  },

  methods: {
    toggleForm() {
      this.isFormOpen = !this.isFormOpen;
    },
    addPet() {
      const petToAdd = JSON.parse(JSON.stringify(this.petToAdd));
      petToAdd.owner = {
        fullname: this.user.fullname,
        _id: this.user._id,
      };
      this.$store.dispatch({ type: "savePet", petToAdd }).then(() => {
        this.petToAdd = petService.getEmptyPet();
        this.toggleForm();
      });
    },
  },
};
</script>

