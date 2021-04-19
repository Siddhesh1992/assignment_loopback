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
        <li v-if="getHeaderInfo" class="nav-item">
          <nuxt-link class="nav-link" to="#"
            >Home <span class="sr-only">(current)</span></nuxt-link
          >
        </li>
      </ul>
      <div>
        <b-dropdown
          v-if="getHeaderInfo"
          id="dropdown-divider"
          :text="getHeaderInfo"
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
    if (!this.$store.getters.getHeaderInfo) {
      this.$router.replace("/");
    }
    return true;
  },
  computed: {
    getHeaderInfo() {
      return this.$store.getters.getHeaderInfo;
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