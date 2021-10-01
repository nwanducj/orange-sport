<template>
  <v-row justify="center" dense no-gutters class="my-4">
    <v-col cols="12" md="6" justify="center">
      <div class="mx-auto pa-4">
        <div class="font-weight-bold text-h6">Settings & Privacy</div>
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
          <div class="d-flex justify-end">
            <v-btn
              class="text-none rounded-lg"
              color="primary"
              @click="updateEmail"
              >Change Email</v-btn
            >
          </div>
          <div class="my-2 text-body-2">Username</div>
          <v-text-field
            v-model="username"
            label="Username"
            single-line
            filled
            :rules="rules.usernameRules"
            outlined
            solo
            flat
            append-icon="mdi-account"
            color="primary"
          ></v-text-field>
          <div class="d-flex justify-end">
            <v-btn
              class="text-none rounded-lg"
              color="primary"
              @click="updateUsername"
              >Change Username</v-btn
            >
          </div>
          <div class="my-2 text-body-2">New Password</div>
          <v-text-field
            v-model="password"
            label="New Password"
            single-line
            filled
            :rules="rules.passwordRules"
            outlined
            solo
            flat
            append-icon="mdi-lock"
            color="primary"
          ></v-text-field>
          <div class="d-flex justify-end">
            <v-btn
              class="text-none rounded-lg"
              color="primary"
              @click="updatePassword"
              >Change Password</v-btn
            >
          </div>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { resetRouter } from "~/plugins/router-util";
import { mapGetters, mapState } from "vuex";
export default {
  name: "settings",
  computed: {
    ...mapGetters({
      userDto: "getUserDto",
      user: "getUser",
    }),
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      rules: {
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        passwordRules: [
          (v) => !!v || "Password is required",
          (v) => v.length >= 6 || "Password must be more than 6 characters",
        ],
        usernameRules: [
          (v) => !!v || "Username is required",
          (v) => v.length >= 3 || "Username must be more than 3 characters",
          (v) => v.length <= 20 || "Username must be less than 20 characters",
        ],
      },
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
      resetRouter();
    },
    updateUsername() {
      this.$store.dispatch("updateUsername", this.username);
    },
    updatePassword() {
      this.$store.dispatch("changePassword", this.password);
    },
    updateEmail() {
      this.$store.dispatch("changeEmail", this.email);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>