<template>
  <v-app>
    <v-main>
      <div class="ml-4 d-flex" @click="$router.push('/')">
        <img
          class="logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzNwlmhBq-5utSadLRIMAsAoHkmGssUrPw1g&usqp=CAU"
        />
      </div>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "auth",
};
</script>
<style lang="scss" scoped>
img {
  width: 30%;
  height: 50%;
}
@media screen and (min-width: 600px) {
  img {
    width: 10%;
  }
}
</style>