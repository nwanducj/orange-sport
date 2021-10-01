<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <div class="card">
        <div style="width: 90%" class="mx-auto">
          <div class="font-weight-bold text-h4">
            Let's help yor retrieve your passowrd.
          </div>
          <div class="text-h6 my-2">
            Please enter the email of the acoount you want to retreive
          </div>
          <div>
            <v-form class="mt-6">
              <div class="my-2 text-body-2">Email</div>
              <v-text-field
                v-model="email"
                label="Email"
                single-line
                filled
                solo
                flat
                outlined
                append-icon="mdi-email-outline"
                color="primary"
                :rules="rules.emailRules"
              ></v-text-field>

              <v-btn
                class="my-6 px-6 py-6 white--text text-none"
                color="primary"
                depressed
                block
                style="border-radius: 10px"
                @click="forgotPassword"
              >
                Continue</v-btn
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
  name: "forgot-password",
  layout: "auth",
  props: {},
  data() {
    return {
      hide_password: true,
      emailSent: false,
      email: "chidikenwandu@gmail.com",
      password: "",
      password2: "",
      loading: false,
      rules: {
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
      },
    };
  },
  methods: {
    togglePassword: function () {
      this.hide_password = !this.hide_password;
    },
    forgotPassword() {
      this.$store
        .dispatch("forgotPassword", this.email)
        .then((_) => {})
        .catch((error) => {
          console.log(error);
        });
    },
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
