<template>
  <!-- <section class="pet-details main-layout"> -->
  <section class="main-layout min-height">
    <div v-if="pet" class="pet-details-container">
      <div v-if="pet.imgUrl" class="pet-details-pic-grid">
        <article class="article-img-1">
          <img
            class="img-details img-1"
            :src="require('@/assets/images/animal/' + petImg1)"
          />
        </article>
        <article class="article-img-2">
          <img
            class="img-details img-2"
            :src="require('@/assets/images/animal/' + petImg2)"
          />
        </article>
        <article class="article-img-3">
          <img
            class="img-details img-3"
            :src="require('@/assets/images/animal/' + petImg3)"
          />
        </article>
      </div>
      <div class="pet-bio-contianer">
        <div class="pet-bio">
          <h2>{{ pet.name }}'s Story:</h2>
          <p>{{ pet.bio }}</p>
        </div>
        <div class="pet-details-likes">
          🧡 Liked by {{ pet.likes }} Users 🧡
        </div>

        <div class="pet-properties">
          <div class="flex-left">
            <span
              :class="{
                'pet-vacinated pet-tag': pet.isVaccinated,
              }"
              v-show="pet.isVaccinated"
            >
              Recvied Vaccines</span
            >
            <span class="pet-trained pet-tag">
              Training: {{ pet.trainedLevel }}</span
            >

            <span
              :class="{
                'pet-safe pet-tag': pet.isSafeWithChild,
              }"
              v-show="pet.isSafeWithChild"
            >
              Safe with Children</span
            >
            <span
              :class="{
                'pet-castrated pet-tag': pet.isCastrated,
              }"
              v-show="pet.isCastrated"
            >
              Castrated</span
            >
            <span
              :class="{
                'pet-birth-certificate pet-tag': pet.isBirthCertificate,
              }"
              v-show="pet.isBirthCertificate"
            >
              Birth Certificate</span
            >
            <!-- <span class="pet-check pet-tag"> check</span>
            <span class="pet-random pet-tag"> random</span> -->
          </div>

          <div class="flex-right">
            <span
              :class="{
                'pet-dog pet-tag': pet.type === 'dog',
                'pet-cat pet-tag': pet.type === 'cat',
                'pet-fish pet-tag': pet.type === 'fish',
                'pet-rabbit pet-tag': pet.type === 'rabbit',
                'pet-parrot pet-tag': pet.type === 'parrot',
              }"
            >
              {{ pet.breed }}</span
            >
            <span class="pet-age pet-tag"> {{ pet.age }} yeras old</span>
            <span class="pet-weight pet-tag"> size: {{ pet.size }}</span>

            <span
              :class="{
                'pet-gender-male pet-tag': pet.gender === 'male',
                'pet-gender-female pet-tag': pet.gender === 'female',
              }"
            >
              {{ pet.gender }}</span
            >
            <span
              :class="{
                'pet-playfull pet-tag': pet.isPlayfull,
              }"
              v-show="pet.isPlayfull"
            >
              Playfull</span
            >
          </div>
        </div>

        <el-button @click="adoptPet" class="adopt-btn" type="success" round>
          Adopt Now!
        </el-button>

        <div class="pet-visit-share-container">
          <el-button
            class="pet-visit-owner-btn"
            @click="showOwner"
            type="info"
            round
            >Visit Owner</el-button
          >

          <el-button class="pet-share-facebook" @click="true" type="info" round
            >Share</el-button
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { petService } from "../service/pet.service.js";
import { socketService } from "../service/socket.service.js";
export default {
  name: "pet-details",
  components: {},
  props: {},
  created() {
    this.getPet();
    window.scrollTo(0, 0);
  },
  data() {
    return {
      pet: {},
    };
  },
  computed: {
    petId() {
      return this.$route.params.petId;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    petImg1() {
      return this.pet.imgUrl[0];
    },
    petImg2() {
      return this.pet.imgUrl[1];
    },
    petImg3() {
      return this.pet.imgUrl[2];
    },
  },
  methods: {
    async getPet() {
      try {
        let petId = this.petId;
        let pet = await petService.getById(petId);
        this.pet = pet;
      } catch (err) {
        console.log(err);
      }
    },
    adoptPet() {
      if (this.loggedinUser) {
        const order = {
          orderBy: this.loggedinUser,
          orderFor: this.pet,
          orderOwner: this.pet.owner,
          created: Date.now(),
        };
        this.$store
          .dispatch({ type: "saveOrder", orderToSave: order })
          .then((savedOrder) => {
            this.$message({
              message: "Congrats, your request has been sent",
              type: "success",
            });
            socketService.emit("orderAdded", savedOrder);
          });
      } else {
        this.$store.commit({ type: "toggleUserModal" });
      }
    },
    showOwner() {
      this.$router.push({
        name: "user-details",
        params: { userId: this.pet.owner._id },
      });
    },
  },
};
</script>


