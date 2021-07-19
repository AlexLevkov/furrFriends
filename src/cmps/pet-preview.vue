<template>
	<section class="pet-preview">
		<article class="pet-card" @click="showPetDetails(pet._id)">
			<!-- <div>❤</div> -->
			<ToggleFavorite />
			<div class="pet-card-img-container">
				<img :src="require('@/assets/images/animal/' + petImg)" />
			</div>

			<div class="pet-card-info">
				<h3>{{ pet.name }}</h3>
				<div v-if="isUserPre">
					<button @click.stop="editPet">Edit</button>
					<button @click.stop="removePet">Delete</button>
				</div>
				<button v-else @click.stop="goToUser(pet.owner._id)">
					Owend By: {{ pet.owner.fullname }}
				</button>
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
			console.log("this.pet.imgUrl:", this.pet.imgUrl);
			return this.pet.imgUrl;
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
