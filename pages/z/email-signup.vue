<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <div class="card">
        <div style="width: 90%" class="mx-auto">
          <div class="font-weight-bold text-h4">Let's get started!</div>
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
              <div class="my-2 mt-n3 text-body-2">Password</div>
              <v-text-field
                label="Password"
                single-line
                filled
                background-color="accent"
                solo
                flat
                :type="hide_password ? 'text' : 'password'"
                :append-icon="hide_password ? 'mdi-eye-outline' : 'mdi-eye-off'"
                color="primary"
                @click:append="togglePassword"
              ></v-text-field>
              <div class="my-2 mt-n3 text-body-2">Confirm Password</div>
              <v-text-field
                label="Confirm Password"
                single-line
                filled
                background-color="accent"
                solo
                flat
                :type="hide_password ? 'text' : 'password'"
                :append-icon="hide_password ? 'mdi-eye-outline' : 'mdi-eye-off'"
                color="primary"
                @click:append="togglePassword"
              ></v-text-field>
              <v-btn
                class="my-6 px-6 py-6 white--text text-none"
                color="primary"
                depressed
                block
                style="border-radius: 10px"
                @click="$router.push('/')"
                >Signup with Email</v-btn
              >
              <div class="d-flex justify-center font-weight-bold">or</div>
              <v-btn
                class="mt-6 px-6 py-6 text-none"
                color="primary"
                depressed
                block
                style="border-radius: 10px"
                @click="$router.push('/')"
                outlined
              >
                <v-icon class="pl-2">mdi-phone</v-icon>
                Signup with Phone Number
              </v-btn>
              <div class="text-center mt-8">
                <div class="mt-6">
                  Don't have an account?
                  <strong
                    class="primary--text"
                    @click="$router.push('/auth/signup')"
                    >Login</strong
                  >
                </div>
              </div>
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
    };
  },
  methods: {
    togglePassword: function () {
      this.hide_password = !this.hide_password;
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
