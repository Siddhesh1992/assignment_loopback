<template>
  <div>Home</div>
</template>

<script>
export default {
  middleware: ["auth"],
  async fetch() {
    console.log("this is store ", this.$store);

    const { id, userId } = this.$store.getters.getUser;

    const userDet = await this.$api.get(
      `/Users/${userId}?access_token=${id}&include=User`
    );

    console.log("this is userDet ", userDet);

    this.$store.commit("setHeaderInfo", userDet.username);
  },
};
</script>