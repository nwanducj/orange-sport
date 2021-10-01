<template>
  <div class="nav d-block d-sm-none">
    <v-navigation-drawer v-model="drawer" absolute temporary>
    </v-navigation-drawer>
    <v-app-bar color="white" fixed app>
      <v-btn icon @click="drawer = !drawer">
        <v-icon color="black" size="20">mdi-menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <img
        class="logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzNwlmhBq-5utSadLRIMAsAoHkmGssUrPw1g&usqp=CAU"
      />
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="black" size="20">mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "MobileHeader",
  middleware: ["navigationWatcher"],
  data() {
    return {
      drawer: false,
    };
  },

  props: {},
  computed: {},

  methods: {},
  created() {},
};
</script>

<style scoped lang="scss">
.nav {
  display: block;
}
.logo {
  width: 20%;
}
@media only screen and (min-width: 768px) and (max-width: 992px) {
  .nav {
    display: none;
  }
}
//medium
@media only screen and (min-width: 992px) {
  .nav {
    display: none;
  }
}
</style>