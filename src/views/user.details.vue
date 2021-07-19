<template>
  <section class="user-details main-layout min-height" v-if="user">
    <div>
      <h2>Hello {{ user.fullname }}</h2>
      <img class="user-avatar" src="../assets/images/user.png" />
      <h3>About</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
        asperiores quos cum nostrum fuga nulla delectus. Tempore delectus, ad
        accusantium expedita exercitationem repellendus. Nisi ad, obcaecati ipsa
        ipsum impedit asperiores!
      </p>
      <article
        class="user-reviews"
        v-for="review in user.reviews"
        :key="review.byUser"
      >
        <h3>Given by {{ review.byUser }}</h3>
        <p>{{ review.text }}</p>
        <hr />
      </article>
      <button @click="toggleReview">Add Review</button>
      <button @click="toggleForm">Add pet</button>
      <form v-if="isReviewOpen" @submit.prevent="addreview">
        <textarea v-model="reviewText" cols="30" rows="10"></textarea>
        <button>Post</button>
      </form>
      <form v-if="isFormOpen" @submit.prevent="addPet">
        <el-input v-model="petToAdd.name" placeholder="Pet's name"></el-input>

        <el-select v-model="petToAdd.type" placeholder="Select Pet Type">
          <el-option :label="'Dog'" :value="'dog'">dog</el-option>
          <el-option :label="'Cat'" :value="'cat'">cat</el-option>
          <el-option :label="'Fish'" :value="'fish'">fish</el-option>
        </el-select>

        <el-radio v-model="petToAdd.gender" label="male"></el-radio>

        <el-radio v-model="petToAdd.gender" label="female"></el-radio>

        <input
          v-model="petToAdd.age"
          type="range"
          id="age"
          name="age"
          min="0"
          max="25"
          step="0.2"
        />
        <span id="sAge">{{ petToAdd.age }} years</span>

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

        <button>Save</button>
      </form>
      <pet-list
        @edit="editPet"
        :isUserPre="isLoggedinUser"
        :pets="usersPets"
      ></pet-list>
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
      isReviewOpen: false,
      reviewText: "",
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
    toggleReview() {
      this.isReviewOpen = !this.isReviewOpen;
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
    editPet(petToEdit) {
      this.toggleForm();
      this.petToAdd = petToEdit;
    },
    addreview() {
      const review = {
        byUser: this.$store.getters.loggedinUser.fullname,
        text: this.reviewText,
      };
      this.$store
        .dispatch({
          type: "addReview",
          review: review,
          user: this.user,
        })
        .then(() => {
          this.reviewText = "";
          this.toggleReview();
        });
    },
  },

  watch: {
    "$route.params.userId": {
      immediate: true,
      handler() {
        const { userId } = this.$route.params;
        userService.getById(userId).then((user) => (this.user = user));
      },
    },
  },
};
</script>

