<template>
  <v-app>
    <HeaderDesktop />
    <mobile-header />
    <v-main>
      <Nuxt />
    </v-main>
    <bottom-nav></bottom-nav>
    <CreateEditProfile
      :showCompleteProfile="showCompleteProfile"
      @closeDialog="closeDialog"
    />
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BottomNav from "~/components/BottomNav.vue";
import HeaderDesktop from "~/components/HeaderDesktop.vue";
import MobileHeader from "~/components/MobileHeader.vue";
export default {
  data() {
    return {
      loading: null,
      showCompleteProfile: false,
      showVerify: false,
    };
  },
  components: { BottomNav, HeaderDesktop, MobileHeader },
  computed: {
    ...mapGetters({
      authType: "getAuthType",
      user: "getUser",
    }),
  },
  methods: {
    closeDialog() {
      this.showCompleteProfile = false;
    },
  },
  mounted() {
    if (
      this.user &&
      this.user.sign_in_provider === "password" &&
      this.user.email_verified === false
    ) {
      this.$router.push("/auth/email-verification");
      return;
    }
    // console.log(this.user.sign_in_provider === "password");
  },
  created() {
    try {
      this.$store.dispatch("fetchData").then((exist) => {
        console.log(exist);

        if (exist != null) {
          this.showCompleteProfile = exist;
        }
        this.loadingPage = false;
      });
    } catch (e) {
      console.log(e);
      this.loadingPage = false;
    }
  },
};
</script>