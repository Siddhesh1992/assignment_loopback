<template>
  <div class="container main-container">
    <div class="row d-flex justify-content-center">
      <div class="login-form">
        <form @submit.prevent="login">
          <h2 class="text-center">{{ title }}</h2>
          <div v-if="title != 'Login'" class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="username"
              placeholder="Username"
            />
            <div class="error">
              {{
                errors.username || getErrors.username
                  ? getErrors.username[0]
                  : ""
              }}
            </div>
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="email"
              placeholder="Email"
            />
            <div class="error">
              {{ errors.email || getErrors.email ? getErrors.email[0] : "" }}
            </div>
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Password"
            />
            <div class="error">{{ errors.password }}</div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">
              {{ title === "Login" ? "Login" : "Create an account" }}
            </button>
          </div>
          <div v-if="title == 'Login'" class="clearfix">
            <label class="form-check-label"
              ><input type="checkbox" /> Remember me</label
            >
          </div>
        </form>
        <p class="text-center">
          <button class="btn btn-link" @click="changeTitle">
            {{ title === "Login" ? "Create an account" : "Login" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Login",
      email: "",
      username: "",
      password: "",
      errors: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  computed: {
    getErrors() {
      return this.$store.getters.getErrors
        ? this.$store.getters.getErrors.error.details.messages
        : "";
    },
  },
  methods: {
    async login(e) {
      this.errors.email = "";
      this.errors.password = "";
      this.errors.username = "";

      let count = 0;
      if (this.email.trim().length == 0) {
        count++;
        this.errors.email = "Email is Required";
      }

      if (this.password.trim().length == 0) {
        count++;
        this.errors.password = "Password is Required";
      }

      if (count > 0) {
        return;
      }

      if (this.title === "Login") {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
      } else {
        this.$store.dispatch("signup", {
          email: this.email,
          username: this.username,
          password: this.password,
        });
      }
    },
    changeTitle() {
      this.title = this.title == "Login" ? "Create an account" : "Login";
    },
  },
};
</script>

<style scoped>
.main-container {
  margin: 15px;
}
.error {
  color: red;
}

.container {
  margin: 0 auto;
  /* min-height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.login-form {
  width: 340px;
  font-size: 15px;
}
</style>
