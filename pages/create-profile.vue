<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <div class="card">
        <div style="width: 90%" class="mx-auto">
          <div class="font-weight-bold text-h4">Create a Profile</div>
          <div>
            <v-form class="mt-6">
              <div class="my-2 text-body-2">Email</div>
              <v-text-field
                label="Email"
                single-line
                filled
                solo
                flat
                background-color="accent"
                append-icon="mdi-email-outline"
                color="primary"
              ></v-text-field>
              <div class="my-2 mt-n3 text-body-2">Phone</div>
              <v-text-field
                label="Phone"
                single-line
                filled
                background-color="accent"
                solo
                flat
                append-icon="mdi-phone"
                color="primary"
              ></v-text-field>
              <div class="my-2 mt-n3 text-body-2">Username</div>
              <v-text-field
                label="Username"
                single-line
                filled
                background-color="accent"
                solo
                flat
                append-icon="mdi-account"
                color="primary"
              ></v-text-field>
              <div class="my-2 mt-n3 text-body-2">Interest</div>
              <v-select
                filled
                label="Pick an interest"
                placeholder="Pick an Interest"
                background-color="accent"
                multiple
                solo
                flat
                :items="interestList"
                color="primary"
              ></v-select>
              <v-btn
                class="my-6 px-6 py-6 white--text text-none"
                color="primary"
                depressed
                block
                style="border-radius: 10px"
                @click="$router.push('/')"
                >Save Profile</v-btn
              >
            </v-form>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "index",
  layout: "payment",
  props: {},
  data() {
    return {
      hide_password: true,
      interestList: [],
    };
  },
  methods: {
    togglePassword: function () {
      this.hide_password = !this.hide_password;
    },
  },
  created() {
    this.$store.dispatch("getInterest").then((data) => {
      this.interestList = [...data];
    });
  },
};
</script>

<style scoped>
.card {
  padding: 40px 0;
  width: 100%;
}
.forgot-password {
  font-size: 0.85rem;
}
.login-text {
  font-size: 1.2rem;
}
</style>
