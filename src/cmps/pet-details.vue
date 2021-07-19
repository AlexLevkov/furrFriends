<template>
  <!-- <section class="pet-details main-layout"> -->
  <section class="main-layout min-height">
    <!-- {{ pet }} -->
    <div class="pet-details-container">
      <div class="pet-bio-contianer">
        <div class="pet-bio">
          {{ pet.name }}'s bio:
          {{ pet.bio }}

          <el-button @click="adoptPet" class="adopt-btn" type="success" round>
            Adopt Now!</el-button
          >
        </div>

        <div class="pet-properties">
          <div class="flex-left">
            <span
              :class="{ 'pet-vacinated pet-tag': pet.isVaccinated }"
              v-show="pet.isVaccinated"
            >
              recvied vaccines</span
            >
            <span class="pet-trained pet-tag">
              training: {{ pet.trainedLevel }}</span
            >

            <span
              :class="{ 'pet-safe pet-tag': pet.isSafeWithChild }"
              v-show="pet.isSafeWithChild"
            >
              safe with children</span
            >
            <span
              :class="{ 'pet-castrated pet-tag': pet.isCastrated }"
              v-show="pet.isCastrated"
            >
              castrated</span
            >
            <span
              :class="{
                'pet-birth-certificate pet-tag': pet.isBirthCertificate,
              }"
              v-show="pet.isBirthCertificate"
            >
              birth certificate</span
            >
            <!-- <span class="pet-check pet-tag"> check</span>
            <span class="pet-random pet-tag"> random</span> -->
          </div>

          <div class="flex-right">
            <span
              :class="{
                'pet-dog pet-tag': pet.type === 'dog',
                'pet-cat pet-tag': pet.type === 'cat',
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
              :class="{ 'pet-playfull pet-tag': pet.isPlayfull }"
              v-show="pet.isPlayfull"
            >
              playfull</span
            >
          </div>
        </div>
      </div>

      <div class="pet-details-pic-grid">
        <article class="article-img-1">
          <img class="img-details img-1" :src="require('@/assets/images/animal/' + petImg1)"  />
        </article>
        <article class="article-img-2">
          <img class="img-details img-2" :src="require('@/assets/images/animal/' + petImg2)"  />
        </article>
        <article class="article-img-3">
          <img class="img-details img-3" :src="require('@/assets/images/animal/' + petImg3)"  />
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { petService } from "../service/pet.service.js";
export default {
  name: "pet-details",
  components: {},
  props: {},
  created() {
    this.getPet();
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
      } catch {
        console.log(err);
      }
    },
    adoptPet() {
      if (this.loggedinUser) {
        const order = {
          orderBy: this.loggedinUser._id,
          orderFor: this.pet._id,
          created: Date.now(),
        }
        this.$store.dispatch({type:'saveOrder', orderToSave: order}).then(console.log)       
      } else {
        this.$store.commit({ type: "toggleUserModal" });
      }
    },
  },
};
</script>


