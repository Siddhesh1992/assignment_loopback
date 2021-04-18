<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <nuxt-link class="navbar-brand" to="#">Assignment</nuxt-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li v-if="getUser" class="nav-item">
          <nuxt-link class="nav-link" to="#"
            >Home <span class="sr-only">(current)</span></nuxt-link
          >
        </li>
      </ul>
      <div>
        <b-dropdown
          v-if="getUser"
          id="dropdown-divider"
          :text="getUser"
          class="m-2"
        >
          <b-dropdown-item-button @click="logout"
            >Logout</b-dropdown-item-button
          >
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  validate({ params }) {
    if (!this.$store.getters.getUser) {
      this.$router.replace("/");
    }
    return true;
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser.username;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.nuxt-link-active {
  color: white !important;
  background: #6c757d !important;
}
</style>