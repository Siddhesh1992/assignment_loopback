
<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <client-only
            ><date-picker
              placeholder="Start Date"
              format="dd-MM-yyyy"
              v-model="startDate"
          /></client-only>
        </div>

        <div class="col-xs-12 col-md-4">
          <client-only
            ><date-picker
              placeholder="End Date"
              format="dd-MM-yyyy"
              v-model="endDate"
          /></client-only>
          <i @click="fetchTrans" class="fas fa-search custom-position"></i>
        </div>

        <div class="col-xs-12 col-4 float-right">
          <NuxtLink class="float-right" to="/user/create-transaction"
            ><i class="fas fa-plus-circle"></i
          ></NuxtLink>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row col-md-12 clearfix">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody v-for="(trans, index) in userTrans" :key="index">
            <tr>
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ trans.customer_name }}</td>
              <td>{{ trans.amount }}</td>
              <td>{{ trans.description }}</td>
              <td>{{ trans.type }}</td>
              <td>
                <NuxtLink
                  :to="{
                    path: '/user/create-transaction/' + trans.id,
                  }"
                  ><i class="fas fa-edit"></i
                ></NuxtLink>
              </td>
              <td>
                <a @click="(e) => deleteTrans(e, trans.id)">
                  <i class="far fa-trash-alt"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      v: 1,
      startDate: "",
      endDate: "",
      userTrans: [],
    };
  },
  middleware: ["auth"],
  methods: {
    async fetchTrans() {
      debugger;
      const { id, userId } = this.$store.getters.getUser;
      let url = `/transactions/get-transaction?access_token=${id}`;
      if (this.startDate && this.endDate)
        url = `/transactions/get-transaction?access_token=${id}&startDate=${this.startDate.toISOString()}&endDate=${this.endDate.toISOString()}`;

      const userTrans = (await this.$api.get(url)).data;

      this.userTrans = userTrans;
    },
    async deleteTrans(e, transId) {
      const { id, userId } = this.$store.getters.getUser;
      await this.$api.delete(`/transactions/${transId}?access_token=${id}`);
      this.fetchTrans();
    },
  },
  async fetch() {
    const { id, userId } = this.$store.getters.getUser;

    const userDet = await this.$api.get(
      `/Users/${userId}?access_token=${id}&include=User`
    );
    this.fetchTrans();
    console.log("this is userDet ", userDet);

    this.$store.commit("setHeaderInfo", userDet.data.username);
  },
};
</script>

<style scoped>
.row-style {
  width: 100%;
}
.custom-position {
  position: absolute;
  top: 6px;
  left: 167px;
}
</style>