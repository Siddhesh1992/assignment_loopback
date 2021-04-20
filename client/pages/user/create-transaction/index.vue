<template>
  <div class="container main-container">
    <div class="row d-flex justify-content-center">
      <div class="login-form">
        <form>
          <h2 class="text-center">Transaction</h2>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="customer_name"
              placeholder="Customer Name"
            />
            <div class="error">
              {{ errors.customer_name }}
            </div>
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="amount"
              placeholder="Amount"
            />
            <div class="error">
              {{ errors.amount }}
            </div>
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="description"
              placeholder="description"
            />
            <div class="error">{{ errors.description }}</div>
          </div>

          <select
            class="form-group col-md-12"
            v-model="type"
            aria-label="select example"
          >
            <option selected value="">Select Type</option>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
          </select>
          <div class="error">{{ errors.type }}</div>

          <div class="form-group">
            <center><NuxtLink to="/user"> Back </NuxtLink></center>
            <button
              type="button"
              @click="createTransaction"
              class="btn btn-primary btn-block"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.error {
  color: red;
}
</style>

<script>
export default {
  data() {
    return {
      customer_name: "",
      amount: "",
      description: "",
      type: "",
      errors: {
        customer_name: "",
        amount: "",
        description: "",
        type: "",
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
    async createTransaction(e) {
      this.errors.customer_name = "";
      this.errors.amount = "";
      this.errors.description = "";
      this.errors.type = "";

      let count = 0;
      if (this.customer_name.trim().length == 0) {
        count++;
        this.errors.customer_name = "Customer name is Required";
      }

      if (this.amount.trim().length == 0) {
        count++;
        this.errors.amount = "Amount is Required";
      }

      if (this.description.trim().length == 0) {
        count++;
        this.errors.description = "Description is Required";
      }

      if (this.type.trim().length == 0) {
        count++;
        this.errors.type = "Type is Required";
      }

      if (count > 0) {
        return swal("Check for Errors");
      }
      const { id, userId } = this.$store.getters.getUser;

      const userTrans = (
        await this.$api.post(
          `/transactions/create-transaction?access_token=${id}`,
          {
            customer_name: this.customer_name,
            amount: this.amount,
            description: this.description,
            type: this.type,
          }
        )
      ).data;

      swal("created successfully");

      this.customer_name = "";
      this.amount = "";
      this.description = "";
      this.type = "";
      this.errors = {
        customer_name: "",
        amount: "",
        description: "",
        type: "",
      };
    },
  },
};
</script>