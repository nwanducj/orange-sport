<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <div class="card">
        <div style="width: 90%" class="mx-auto">
          <div class="font-weight-bold text-h4">
            {{ isLogin ? "Welcome Back!" : "Let's get started!" }}
          </div>
          <div>
            <v-form class="mt-6" ref="form" v-model="valid" lazy-validation>
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
              <div class="my-2 mt-n3 text-body-2">Password</div>
              <v-text-field
                v-model="password"
                label="Password"
                single-line
                filled
                outlined
                solo
                flat
                :type="hide_password ? 'text' : 'password'"
                :append-icon="hide_password ? 'mdi-eye-outline' : 'mdi-eye-off'"
                color="primary"
                @click:append="togglePassword"
                :rules="rules.passwordRules"
              ></v-text-field>
              <div v-if="!isLogin" class="my-2 mt-n3 text-body-2">
                Confirm Password
              </div>
              <v-text-field
                v-model="password2"
                v-if="!isLogin"
                label="Confirm Password"
                single-line
                filled
                outlined
                solo
                flat
                :type="hide_password ? 'text' : 'password'"
                :append-icon="hide_password ? 'mdi-eye-outline' : 'mdi-eye-off'"
                color="primary"
                @click:append="togglePassword"
                :rules="rules.confirmPasswordRules"
              ></v-text-field>
              <div class="d-flex justify-end primary--text mt-n6">
                <v-btn
                  text
                  class="text-none"
                  color="primary"
                  @click="$router.push('/auth/forgot-password')"
                  >Forgot password?</v-btn
                >
              </div>
              <v-btn
                class="my-6 px-6 py-6 white--text text-none"
                color="primary"
                depressed
                block
                style="border-radius: 10px"
                @click="authenticate"
              >
                {{ !isLogin ? "Signup with Email" : "Login with Email" }}</v-btn
              >
              <div class="d-flex justify-center font-weight-bold">or</div>
              <v-btn
                class="mt-6 px-6 py-6 text-none"
                color="primary"
                depressed
                block
                style="border-radius: 10px"
                @click="$router.push('/auth/phone')"
                outlined
              >
                <v-icon class="pl-2">mdi-phone</v-icon>
                {{ !isLogin ? "Signup with Phone" : "Login with Phone" }}
              </v-btn>
              <div class="text-center mt-8">
                <div class="mt-6" v-if="isLogin">
                  Don't have an account?
                  <strong class="primary--text" @click="isLogin = false"
                    >Signup</strong
                  >
                </div>
                <div class="mt-6" v-else>
                  Already have an account?
                  <strong class="primary--text" @click="isLogin = true"
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
  name: "email",
  layout: "auth",
  props: {},
  data() {
    return {
      hide_password: true,
      isLogin: true,
      email: "",
      password: "",
      password2: "",
      loading: false,
      rules: {
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        passwordRules: [
          (v) => !!v || "Password is required",
          (v) => v.length >= 6 || "Password must be more than 6 characters",
        ],
        confirmPasswordRules: [
          (v) => !!v || "Confirm password",
          (v) => v === this.password || "Password do not match",
        ],
      },
    };
  },
  methods: {
    togglePassword: function () {
      this.hide_password = !this.hide_password;
    },
    authenticate() {
      if (!this.validate()) {
        return;
      }
      let authData = {
        email: this.email,
        password: this.password,
        isLogin: this.isLogin,
      };
      this.$store
        .dispatch("authenticateUserEmail", authData)
        .then((_) => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      if (!this.$refs.form.validate()) {
        setTimeout(() => {
          this.resetValidation();
        }, 3000);
        return false;
      }

      return true;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
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
