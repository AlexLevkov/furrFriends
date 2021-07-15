<template>
  <section class="user-details main-layout" v-if="user">
    <div>
      <h2>Hello {{ user.fullname }}</h2>
      {{ user }}
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
    };
  },
  computed: {},
  methods: {},
};
</script>

