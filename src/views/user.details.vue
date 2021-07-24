<template>
  <section class="user-details main-layout min-height" v-if="user">
    <div>
      <h2>Hello {{ user.fullname }}</h2>
      <div class="user-info-container">
        <div class="user img">
          <img
            class="user-avatar"
            :src="require('@/assets/images/user/' + user.avatar)"
          />
        </div>
        <div class="user about">
          <h2>About</h2>
          <p>
            {{ user.about }}
          </p>
        </div>
      </div>

      <el-button
        @click="toggleReview"
        type="success"
        round
        v-if="loggedinUser._id !== user._id"
        >Add Review</el-button
      >
      <el-button
        @click="toggleForm"
        type="success"
        round
        v-if="loggedinUser._id === user._id"
        >Add Pet</el-button
      >
      <ul v-if="loggedinUserOrders.length && loggedinUser._id === user._id">
        <li>
          <h2>My Adoption Requests:</h2>
          <hr />
        </li>
        <li v-for="order in loggedinUserOrders" :key="order._id">
          <!-- {{ order }} -->
          {{ new Date(order.created).toLocaleString() }}
          <p>Owner's Name: {{ order.orderOwner.fullname }}</p>
          <p>Pet's Name: {{ order.orderFor.name }}</p>

          <el-button @click="removeOrder(order._id)" type="success" round>
            Delete Request</el-button
          >

          <el-button @click="goToPet(order.orderFor._id)" type="success" round
            >Visit Pet Page
          </el-button>
          <el-button
            @click="goToUser(order.orderOwner._id)"
            type="success"
            round
          >
            Visit Owner Page
          </el-button>
          <hr />
        </li>
      </ul>
      <ul v-if="loggedinUserPending.length && loggedinUser._id === user._id">
        <li><h2>Adoption Offers</h2></li>
        <li v-for="order in loggedinUserPending" :key="order._id">
          <hr />
          {{ new Date(order.created).toLocaleString() }}
          Requested By: {{ order.orderBy.fullname }}
          <br />
          For: {{ order.orderFor.name }}
          <br />

          <el-button
            @click="approveOrder(order, order.orderBy)"
            type="success"
            round
          >
            Approve Rquest
          </el-button>
          <el-button @click="removeOrder(order._id)" type="success" round>
            Delete Rquest
          </el-button>
          <el-button @click="goToPet(order.orderFor._id)" type="success" round>
            Visit Pet Page
          </el-button>
          <el-button @click="goToUser(order.orderBy._id)" type="success" round>
            Visit {{ order.orderBy.fullname }}'s Page
          </el-button>
        </li>
      </ul>

      <!-- <button @click="toggleReview">Add Review</button> -->
      <!-- <button @click="toggleForm">Add Pet</button> -->

      <form v-if="isReviewOpen" @submit.prevent="addReview">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 3 }"
          placeholder="Please Enter Review"
          v-model="reviewText"
        >
        </el-input>

        <el-button @click="addReview" type="success" round>Post</el-button>
      </form>

      <div
        :class="{
          'pet-form-container': true,
          'modal-close': !isFormOpen,
        }"
      >
        <form class="add-pet-form" v-if="isFormOpen" @submit.prevent="addPet">
          <div>
            <h2>Please Add Your Pet's Details</h2>
            <label class="pet-label">
              Name:
              <el-input
                class="pet-name"
                v-model="petToAdd.name"
                placeholder="Pet's name"
              ></el-input>
            </label>
          </div>

          <label class="pet-label"
            >Type:

            <el-select v-model="petToAdd.type" placeholder="Select Pet Type">
              <el-option :label="'Dog'" :value="'dog'">dog</el-option>
              <el-option :label="'Cat'" :value="'cat'">cat</el-option>
              <el-option :label="'Fish'" :value="'fish'">fish</el-option>
            </el-select>
          </label>

          <label class="pet-label"
            >Size:

            <el-select v-model="petToAdd.size" placeholder="Select Pet Size">
              <el-option :label="'Small'" :value="'small'">Small</el-option>
              <el-option :label="'Medium'" :value="'medium'">Medium</el-option>
              <el-option :label="'Large'" :value="'large'">Large</el-option>
            </el-select>
          </label>

          <label class="pet-label"
            >Training Level:
            <el-select
              v-model="petToAdd.trainedLevel"
              placeholder="Select Pet Type"
            >
              <el-option :label="'None'" :value="'none'">None</el-option>
              <el-option :label="'Basic'" :value="'basic'">Basic</el-option>
              <el-option :label="'Advanced'" :value="'advanced'"
                >Advanced</el-option
              >
            </el-select>
          </label>

          <label class="pet-label pet-box"
            >Gender:
            <el-radio v-model="petToAdd.gender" label="male"></el-radio>

            <el-radio v-model="petToAdd.gender" label="female"></el-radio>
          </label>

          <label class="pet-label pet-box"
            >Age:
            <input
              v-model="petToAdd.age"
              type="range"
              id="age"
              name="age"
              min="0"
              max="20"
              step="0.1"
            />
            <span id="sAge">{{ petToAdd.age }} years</span>
          </label>

          <el-checkbox class="pet-box" v-model="petToAdd.isVaccinated"
            >Vaccinated</el-checkbox
          >

          <el-checkbox class="pet-box" v-model="petToAdd.isSafeWithChild"
            >Safe With Children</el-checkbox
          >

          <el-checkbox class="pet-box" v-model="petToAdd.isPlayfull"
            >Playfull</el-checkbox
          >

          <el-button @click="addPet" type="success" round class="save-btn"
            >Save</el-button
          >
          <el-button
            class="close-modal-btn"
            @click="closeModal"
            type="info"
            circle
            >X</el-button
          >
        </form>
      </div>

      <h2>
        Reviews
        <hr />
      </h2>
      <article
        class="user-reviews"
        v-for="review in user.reviews"
        :key="review.byUser"
      >
        <h3>Given by {{ review.byUser }}</h3>
        <p>{{ review.text }}</p>
        <hr />
      </article>
      <pet-list @edit="editPet" :isUserPre="isLoggedinUser" :pets="usersPets" />
    </div>    
  </section>
</template>

<script>
import { userService } from "../service/user.service.js";
import { petService } from "../service/pet.service.js";
import petList from "../cmps/pet-list.vue";
import { socketService } from "../service/socket.service.js";
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
    this.$store.dispatch({ type: "loadOrders" });

    socketService.on("newOrder", (order) => {
      this.getOrders();
      console.log("order:", order);
    });
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
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    loggedinUserOrders() {
      return this.$store.getters.orders.filter(
        (order) => order.orderBy._id === this.user._id
      );
    },
    loggedinUserPending() {
      return this.$store.getters.orders.filter(
        (order) => order.orderOwner._id === this.user._id
      );
    },

    // orders() {
    //   console.log('orders:', this.$store.getters.orders)
    //   return this.$store.getters.orders;
    // },
  },

  methods: {
    toggleForm() {
      this.isFormOpen = !this.isFormOpen;
      // if (this.isFormOpen)
      // this.$store.commit({ type: "toggleUserModal" });
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
      // this.$store.commit({ type: "toggleUserModal" });
    },
    editPet(petToEdit) {
      this.toggleForm();
      this.petToAdd = petToEdit;
    },
    addReview() {
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
    removeOrder(orderId) {
      this.$store.dispatch({ type: "removeOrder", orderId });
    },
    approveOrder(order, newOwner) {
      let petToAdd = order.orderFor;
      petToAdd.owner = newOwner;
      this.$store
        .dispatch({
          type: "savePet",
          petToAdd,
        })
        .then(() => this.removeOrder(order._id));
      //
    },
    goToPet(petId) {
      this.$router.push({
        name: "pet-details",
        params: { petId },
      });
    },
    // showUserDetails() {
    // 	this.$router.push({
    // 		name: "pet-details",
    // 		params: { petId: this.pet._id },
    // 	});
    // },
    goToUser(userId) {
      this.$router.push(`/user/${userId}`);
    },
    closeModal() {
      this.isFormOpen = !this.isFormOpen;
      // this.$store.commit({ type: "toggleUserModal" });
    },
    getOrders() {
      this.$store.dispatch({ type: "loadOrders" });
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

