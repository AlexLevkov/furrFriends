<template>
	<section class="user-details main-layout min-height" v-if="user">
		<div>
			<h2>Hello {{ user.fullname }}</h2>
			<img class="user-avatar" src="../assets/images/user.png" />
			<h3>About</h3>
			<p>
				<!-- Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Libero asperiores quos cum nostrum fuga nulla delectus.
				Tempore delectus, ad accusantium expedita exercitationem
				repellendus. Nisi ad, obcaecati ipsa ipsum impedit
				asperiores! -->
			</p>
			<ul
				v-if="
					loggedinUserOrders.length &&
					loggedinUser._id === user._id
				"
			>
				<li>Adoption Request by {{ user.fullname }}</li>
				<li v-for="order in loggedinUserOrders" :key="order._id">
					<!-- {{ order }} -->
					<hr />
					buyer name: {{ order.orderBy.fullname }} product
					name:{{ order.orderFor.name }}
					<button @click="removeOrder(order._id)">
						Delete Request
					</button>
					<button @click="goToPet(order.orderFor._id)">
						Visit Pet Page
					</button>
					<button @click="goToUser(order.orderOwner._id)">
						Visit Owner Page
					</button>
				</li>
			</ul>
			<ul
				v-if="
					loggedinUserPending.length &&
					loggedinUser._id === user._id
				"
			>
				<li><h3>Adoption Offers</h3></li>
				<li v-for="order in loggedinUserPending" :key="order._id">
					<hr />
					requested by: {{ order.orderBy.fullname }}
					<br />
					for: {{ order.orderFor.name }}
					<br />

					<button @click="approveOrder(order, order.orderBy)">
						Approve Rquest
					</button>
					<button @click="removeOrder(order._id)">
						Delete Rquest
					</button>
					<button @click="goToPet(order.orderFor._id)">
						Visit Pet Page
					</button>
					<button @click="goToUser(order.orderBy._id)">
						Visit {{ order.orderBy.fullname }} Page
					</button>
				</li>
			</ul>

			<button @click="toggleReview">Add Review</button>
			<button @click="toggleForm">Add pet</button>
			<form v-if="isReviewOpen" @submit.prevent="addreview">
				<textarea
					v-model="reviewText"
					cols="30"
					rows="10"
				></textarea>
				<button>Post</button>
			</form>
			<form v-if="isFormOpen" @submit.prevent="addPet">
				<el-input
					v-model="petToAdd.name"
					placeholder="Pet's name"
				></el-input>

				<el-select
					v-model="petToAdd.type"
					placeholder="Select Pet Type"
				>
					<el-option :label="'Dog'" :value="'dog'"
						>dog</el-option
					>
					<el-option :label="'Cat'" :value="'cat'"
						>cat</el-option
					>
					<el-option :label="'Fish'" :value="'fish'"
						>fish</el-option
					>
				</el-select>

				<el-radio v-model="petToAdd.gender" label="male"></el-radio>

				<el-radio
					v-model="petToAdd.gender"
					label="female"
				></el-radio>

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
					<input
						type="checkbox"
						v-model="petToAdd.isVaccinated"
					/>
				</label>
				<label>
					Safe With Children
					<input
						type="checkbox"
						v-model="petToAdd.isSafeWithChild"
					/>
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
			<!-- <article
				class="user-reviews"
				v-for="review in user.reviews"
				:key="review.byUser"
			>
				<h3>Given by {{ review.byUser }}</h3>
				<p>{{ review.text }}</p>
				<hr />
			</article> -->
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
		this.$store.dispatch({ type: "loadOrders" });
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
		removeOrder(orderId) {
			this.$store.dispatch({ type: "removeOrder", orderId });
		},
		approveOrder(order, newOwner) {
			console.log("order:>>", order);
			console.log("new ownder:>>", newOwner);
			let petToAdd = order.orderFor;
			petToAdd.owner = newOwner;
			console.log("petToAdd", petToAdd);
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
	},

	watch: {
		"$route.params.userId": {
			immediate: true,
			handler() {
				const { userId } = this.$route.params;
				userService
					.getById(userId)
					.then((user) => (this.user = user));
			},
		},
	},
};
</script>

