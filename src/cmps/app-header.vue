<template>
	<section class="app-header main-layout full">
		<div class="header-container">
			<nav>
				<router-link class="logo-container" to="/"
					><span class="logo"></span
					><span class="logo-text"
						>FurrFriends</span
					></router-link
				>
			</nav>

			<div class="right-side-nav">
				<router-link to="/pet">Search</router-link>
				<router-link to="/about">About</router-link>

				<div class="user-login" v-if="!loggedinUser">
					<button @click="openUserModal()">Login/Signup</button>
				</div>

				<div class="user-login" @click="openUserModal()" v-else>
					<button class="user-name-avatar">
						{{ loggedinUser.fullname }}
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "app-header",
	components: {},
	props: {},
	created() {},
	data() {
		return {};
	},
	computed: {
		loggedinUser() {
			return this.$store.getters.loggedinUser;
		},
	},
	methods: {
		openUserModal() {
			this.$store.commit({ type: "toggleUserModal" });
		},
	},
};
</script>
