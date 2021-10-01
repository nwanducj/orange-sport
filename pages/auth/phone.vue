<template>
  <v-row justify="center" dense no-gutters>
    <v-col cols="12" md="6">
      <div class="card" v-if="!codeSent">
        <div style="width: 90%" class="mx-auto">
          <div class="font-weight-bold text-h4">Sign up with Phone Number</div>
          <div class="font-weight-bold text-h4" v-if="codeSent">
            Verify Your Phone Number
          </div>
          <div>
            <v-form class="mt-6">
              <div class="my-2 text-body-2">Phone Number</div>
              <v-text-field
                label="Phone Number"
                single-line
                filled
                solo
                flat
                outlined
                v-model="phoneNumber"
                append-icon="mdi-phone"
                color="primary"
                :error-messages="phoneNumberErrors"
                required
                @input="$v.phoneNumber.$touch()"
                @blur="$v.phoneNumber.$touch()"
                hint="Please, include your country code. +234 for Nigeria"
              ></v-text-field>
              <div
                id="recaptcha-container"
                style="background-color: #1b1a1a; width: 300px; margin: auto"
              ></div>
              <v-btn
                class="my-6 px-6 py-6 white--text text-none"
                color="primary"
                depressed
                block
                style="border-radius: 10px"
                @click="authenticate"
                >Login with Phone Number</v-btn
              >
              <v-btn
                class="my-4 px-6 py-6 text-none float-center"
                color="primary"
                depressed
                outlined
                block
                id="log-in"
                style="border-radius: 10px"
                @click="$router.push('/auth/email')"
                >Use Email Instead
              </v-btn>
            </v-form>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div style="width: 90%" class="mx-auto">
          <div class="font-weight-bold text-h4">Verify Your Phone Number</div>
          <div>
            <v-form class="mt-6">
              <div class="my-2 text-body-2">Enter Verification code</div>
              <v-text-field
                label="Verification Code"
                v-model="code"
                single-line
                filled
                solo
                flat
                outlined
                color="primary"
              ></v-text-field>
              <div v-if="codeSent">
                A verification code has been sent to ********
                {{ phoneNumber.slice(10, 14) }}, please check and enter it.
              </div>
              <v-btn
                v-if="codeSent"
                class="my-6 px-6 py-6 white--text text-none"
                color="primary"
                depressed
                block
                style="border-radius: 10px"
                @click="verifyCode"
                >Continue</v-btn
              >
            </v-form>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>


<script>
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "index",
  layout: "auth",
  props: {},
  validations: {
    phoneNumber: {
      required,
      minLength: minLength(14),
      maxLength: maxLength(14),
    },
  },
  computed: {
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.phoneNumber.$dirty) return errors;
      !this.$v.phoneNumber.maxLength &&
        errors.push("Please enter a correct phone number");
      !this.$v.phoneNumber.minLength &&
        errors.push("Please enter a correct phone number");
      !this.$v.phoneNumber.required &&
        errors.push("Please enter a phone number");
      return errors;
    },
  },
  data() {
    return {
      phoneNumber: "",
      code: "",
      recaptchaVerifier: null,
      codeSent: false,
      hide_password: true,
      loading: false,
      recaptchaWidgetId: null,
      confirmResult: null,
    };
  },
  methods: {
    togglePassword: function () {
      this.hide_password = !this.hide_password;
    },
    verifyCode() {
      this.$store
        .dispatch("confirmPhoneAuth", {
          confirmResult: this.confirmResult,
          code: this.code,
        })
        .then((result) => {
          this.$router.push("/");
        });
    },
    authenticate() {
      var auth = getAuth();
      this.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );
      this.recaptchaVerifier.render().then((widgetId) => {
        this.recaptchaWidgetId = widgetId;
      });
      this.$store
        .dispatch("phoneAuth", {
          phoneNumber: this.phoneNumber,
          recaptchaVerifier: this.recaptchaVerifier,
        })
        .then((confirmationResult) => {
          this.confirmResult = confirmationResult;
          this.codeSent = true;
        })
        .catch((error) => {});
      // this.codeSent = true;
    },
  },
  mounted() {
    var auth = getAuth();
    this.recaptchaVerifier = new RecaptchaVerifier(
      "log-in",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
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
