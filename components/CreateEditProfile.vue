<template>
  <v-dialog v-model="showCompleteProfile" fullscreen>
    <v-card>
      <v-row justify="center" dense no-gutters>
        <v-col cols="12" md="6">
          <div class="card">
            <div style="width: 90%" class="mx-auto">
              <div class="font-weight-bold text-h4 d-flex">
                Create a Profile<v-spacer></v-spacer
                ><v-btn icon @click="$emit('closeDialog')"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
              <div>
                <v-form class="mt-6">
                  <div class="my-2 text-body-2">Email</div>
                  <v-text-field
                    v-if="user"
                    :disabled="user.email != null"
                    v-model="profile.email"
                    label="Email"
                    single-line
                    filled
                    solo
                    flat
                    outlined
                    append-icon="mdi-email-outline"
                    color="primary"
                  ></v-text-field>
                  <div class="my-2 mt-n3 text-body-2">Phone</div>
                  <v-text-field
                    v-if="user"
                    :disabled="user.phoneNumber != null"
                    v-model="profile.phoneNumber"
                    label="Phone"
                    single-line
                    filled
                    outlined
                    solo
                    flat
                    hint="Please, include your country code. +234 for Nigeria"
                    append-icon="mdi-phone"
                    color="primary"
                  ></v-text-field>
                  <div class="my-2 mt-n3 text-body-2">Username</div>
                  <v-text-field
                    v-model="profile.username"
                    label="Username"
                    single-line
                    filled
                    outlined
                    solo
                    flat
                    append-icon="mdi-account"
                    color="primary"
                    :error-messages="usernameErrors"
                    required
                    @input="$v.profile.username.$touch()"
                    @blur="$v.profile.username.$touch()"
                  ></v-text-field>
                  <div class="my-2 mt-n3 text-body-2">Interest</div>
                  <v-select
                    filled
                    label="Pick an interest"
                    placeholder="Pick an Interest"
                    outlined
                    multiple
                    solo
                    flat
                    v-model="profile.interest"
                    :items="interestList"
                    :error-messages="interestsErrors"
                    color="primary"
                  ></v-select>
                  <v-btn
                    class="my-6 px-6 py-6 white--text text-none"
                    color="primary"
                    depressed
                    block
                    style="border-radius: 10px"
                    @click="saveUserDto"
                    :loading="saving"
                    >Save Profile</v-btn
                  >
                </v-form>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
export default {
  name: "CreateEditProfile",
  props: ["showCompleteProfile"],
  validations: {
    profile: {
      username: { required, minLength: minLength(3), maxLength: maxLength(20) },
      interest: { required },
    },
  },
  data() {
    return {
      hide_password: true,
      profile: {
        phoneNumber: "",
        email: "",
        username: "",
        interest: [],
      },
      interestList: [],
      saving: false,
    };
  },
  computed: {
    ...mapGetters({
      userDto: "getUserDto",
      user: "getUser",
    }),
    usernameErrors() {
      const errors = [];
      if (!this.$v.profile.username.$dirty) return errors;
      !this.$v.profile.username.maxLength &&
        errors.push("Username must be at most 10 characters long");
      !this.$v.profile.username.minLength &&
        errors.push("Username must be at most 3 characters long");
      !this.$v.profile.username.required &&
        errors.push("Please enter a usersname");
      return errors;
    },
    interestsErrors() {
      const errors = [];
      if (!this.$v.profile.interest.$dirty) return errors;
      !this.$v.profile.interest.required &&
        errors.push("Select at least on interest");
      return errors;
    },
  },
  methods: {
    togglePassword: function () {
      this.hide_password = !this.hide_password;
    },
    saveUserDto() {
      try {
        this.$v.profile.$touch();
        if (this.$v.$invalid) {
          console.log("failed");
        } else {
          let data = {
            email: this.profile.email,
            phoneNumber: this.profile.phoneNumber,
            username: this.profile.username,
            interest: this.profile.interest,
          };
          this.saving = true;
          this.$store.dispatch("saveUserDto", data).then(() => {
            this.saving = false;
            this.$router.push("/");
            this.$emit("closeDialog");
          });
        }
      } catch (error) {
        this.alert = true;
        this.saving = false;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      }
    },
  },
  mounted() {
    this.$store.dispatch("getInterest").then((data) => {
      this.interestList = [...data];
    });
  },
  created() {
    if (this.user) {
      console.log(this.user);
      this.profile.email = this.user.email ? this.user.email : "";
      //   this.phoneNumber = this.user.phoneNumber ? this.user.phoneNumber : "";
    }
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
