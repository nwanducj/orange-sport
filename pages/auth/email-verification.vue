<template>
  <v-row class="fill-height" justify="center" align="center" dense no-gutters>
    <v-col cols="8">
      <v-card-title>
        An email has been sent to you. You will need to verify your email to
        continue on here.
      </v-card-title>
      <v-card-subtitle> Check your email, Chief! </v-card-subtitle>
      <v-btn
        @click="$router.push('/auth/email')"
        block
        class="my-6 rounded-lg text-none"
        color="primary"
        >Continue after Verification</v-btn
      >
      <v-btn
        @click="resendVerify"
        block
        outlined
        class="my-6 rounded-lg text-none"
        color="primary"
        >Resend Verification</v-btn
      >
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "email-verification",
  layout: "auth",
  methods: {
    resendVerify() {
      this.$store.dispatch("resendVerification").then((_) => {});
    },
  },
  created() {
    this.$store.dispatch("fetchData").then((exist) => {});
  },
};
</script>
<style lang="scss" scoped>
</style>