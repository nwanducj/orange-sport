<template>
  <v-dialog v-model="showVerify" fullscreen>
    <v-card>
      <v-row>
        <v-col>
          <div>
            AN email has been sent to you. You will need to verify your email to
            continue
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "VerifyEmail",
  props: ["showVerify"],
};
</script>
<style lang="scss" scoped>
</style>