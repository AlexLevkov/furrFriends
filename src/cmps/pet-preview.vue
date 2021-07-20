<template>
	<section class="pet-preview">
		<article class="pet-card" @click="showPetDetails(pet._id)">
			<div class="pet-likes-container">
				<span class="pet-likes-cnt">{{ pet.likes }}</span>
				<ToggleFavorite :pet="this.pet" />
			</div>

			<div class="pet-card-img-container">
				<img :src="require('@/assets/images/animal/' + petImg)" />
			</div>

			<div class="pet-card-info">
				<h3>{{ pet.name }}</h3>
				<div v-if="isUserPre">
					<button @click.stop="editPet">Edit</button>
					<button @click.stop="removePet">Delete</button>
				</div>
				<div class="pet-card-user-area" v-else>
					<button @click.stop="goToUser(pet.owner._id)">
						{{ pet.owner.fullname }}
					</button>
				</div>

				<div class="pet-card-info-extra">
					<span
						:class="{
							'pet-gender-male pet-tag':
								pet.gender === 'male',
							'pet-gender-female pet-tag':
								pet.gender === 'female',
						}"
					></span>
					<span>{{ pet.age }} years old</span>
				</div>
			</div>
		</article>
	</section>
</template>

<script>
import ToggleFavorite from "@/cmps/heart-animation/ToggleFavorite.vue";
export default {
	name: "pet-preview",
	components: {
		ToggleFavorite,
	},
	props: {
		pet: {
			type: Object,
		},
		isUserPre: {
			type: Boolean,
			default: false,
		},
	},
	created() {},
	data() {
		return {};
	},
	computed: {
		petImg() {
			if (this.pet.imgUrl) {
				return this.pet.imgUrl[0];
			} else {
				return "cat-logo.gif";
			}
		},
	},
	methods: {
		showPetDetails() {
			this.$router.push({
				name: "pet-details",
				params: { petId: this.pet._id },
			});
		},
		goToUser(ownerId) {
			this.$router.push(`/user/${ownerId}`);
		},
		removePet() {
			this.$store.dispatch({ type: "removePet", petId: this.pet._id });
		},
		editPet() {
			const petToEdit = JSON.parse(JSON.stringify(this.pet));
			this.$emit("edit", petToEdit);
		},
	},
};
</script>
