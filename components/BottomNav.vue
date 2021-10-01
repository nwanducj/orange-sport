<template>
  <div class="d-block d-sm-none">
    <v-bottom-navigation app grow color="primary" v-model="value">
      <v-btn @click="$router.push('/discover')" value="home">
        <span class="text-caption">Discover</span>
        <v-icon size="20">mdi-compass</v-icon>
      </v-btn>
      <v-btn @click="$router.push('/buddies')" value="stores">
        <span class="text-caption">Buddies</span>
        <v-icon size="20">mdi-account-group</v-icon>
      </v-btn>
      <v-btn @click="$router.push('/settings')" value="feeds">
        <span class="text-caption">Settings</span>
        <v-icon size="20">mdi-cog</v-icon>
      </v-btn>
      <v-btn icon @click="gotoProfile" value="user">
        <span class="text-caption">Profile</span>
        <v-avatar circle size="30" color="primary">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEPEhUQEBANEBAQFQ4QDxASEBAODxAPFhEWFhUSFRUYHTQgGBolGxUXITEhJSkrLi4uFx8zRDMtNygtLisBCgoKDg0OGhAQGy0iHR0rLS0tLS8tLS0rLS0tLS8tLSsrLSstLS0tLS0tLSstKzUtLS0tLS0tLS0tLS0tLS0rLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwMEBQYIAgH/xABGEAACAgACBQkEBQgJBQAAAAAAAQIDBBEFBhIhMQcTIkFRYXGBsTKRocEUUmKC0SMzNEJyc5KzJUNTY3SissLwFRY1k+H/xAAYAQEAAwEAAAAAAAAAAAAAAAAAAQIDBP/EACIRAQACAgICAgMBAAAAAAAAAAABAhExAyESURNBBCIycf/aAAwDAQACEQMRAD8AnEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4tsUE5SajGKbk3uSS4tkU64cospN14aUq6962l+cs/BETOFq1mUmY7S2Ho/O3VwfY30vct5i7ddMFH+tcvCL+ZB0r7rXm5bCf3pH2OET9qVkvGWRn8jSOKE40654GX9eo/tRkvQy2C0jTes6ra7F9mSb9xzz9Eh9pfeZ6rjZW1Ku2aa3rN9fihHITxOjgQ9q9ykYjDtV4yLur4be7nF4Pg/MlXRWk6cVWraJxnB9a4p9jXUzSJiWc1mF4ACVQAAAAAAAAAAAAAAAAAAAAAAAApX4iFaznOEF2ykor4lhrHpqGCpldPJvhCP1pfgQlpTTFuOm7bpuSeexHPKKXh1LuK2thetPJtHK3rpFZYLD2RkmlPETg1KP2a81735EW4fEZvae+T6+w9aUw0VvTS8zFxls7k/AymctYjxZyekYw732FtZpuXVsr4mLcM+JSnWu8jCcyyq07NfVfkXuG09B7prZ71vRq86OxspS2ok4MykDajOOaalF+aKmhNO36Nt52iXRe6db3xlHsaNG0dpOdTzi93XF8GbH9JjbHbj4NdafYRpPUujdXtN1Y+mN9L3PdKL9qEuuLMmc9ag6zS0diVm3zFmULY/Z6pLvXH39p0HXNSSlFpxkk4tcGms0zas5c9q4l6ABZUAAAAAAAAAAAAAAAAAAAAt9I4tUVWXS9mqE5v7sW8gIe5WtOO7EfR4voVdDLPdtcZv5eRpssUoQz8kWuksW7bpTk8225N98nmyjfF2ShVHjJpeGfF+4wtLprGIX+r+gHpCTna5KmL6nk5vsXcb/AITVXBxjsfR62u9ZnzQ2EjTXGuKyUUveZyg5ZtMy6q1iIYW7UTA2f1UoPthZOPwzyMTiOS2pvOvFXR7FKEJ5eayN9rZWiWi0qzWJRddyV2fq4ut+NUl6SLa3ktvy/SKH9yf4ktspTJ87I8KoJxupc6Hs2WST6mobvUsFXLC2KMnnCa45ZJrw7UTlpbBQui4yS7n1oi/WXRLSlW/aj0q32tfjwEck57LccY6Ye0nPkk0/9KwvMTedmHyS7XU+Huea9xAWFt2oLtW5/I3Dkt0x9Gx9abyhc+Zn2ZT3L/NkzprOJct4zDogAGrEAAAAAAAAAAAAAAAAAAA03lY0hzGj5xTylfKupdrWe1L4R+JuREvLnjelhsOnwVt0l4tRi/hIi2lqx2iiDzk/HIy+rFHOYlyfCC3eP/F8TC4V9fe2bVqVXunL60v+ehy8k4h1ccZlsmL0sqMoxhK2xrNQis2l2vsKC1tnX+cwsorxcfVGUpjXW3LJKU2nJ9be5b/eiu8TXLc8pLdueTW9pL1+BjGPTac+1ngtcaJyjBxtg5NRWaTWb8GbNXea5Xh6U9uFdSfVJRin4mQosEzH0mIn7ZaVxYY3SlVX5yyEM+G08m/Ip3XZGJx+jqsS07E21uTTaeXYMx9k5+le7WTC/wBsn4Rm/kYXTWIoxUdqqcZThvy3xk4+D4mRo1fwsd/NqX7UpS+GZb6S0JVJZ1xjVYt8JR3LPvXWiZ8UfsjCcNi6yHU+kvPf8xRc4WRlF5OLTT7080XenKnDE5NZNxyfZn0iws9peZ0Vnpz2jt1horGK+mq5PNW112fxRTLs1PksxnPaMo7a1Op/cm0vhkbYbw5pAASgAAAAAAAAAAAAAAAAIF5ZMXt6RlHP8zTVDzalZ/vRPRzTygYnndIYuXHKyyC8IJQXoUvpem2v4Th5M3LVKElRnFZyzm0u3pcDTsJ+Pob9qXD8hF98/wDUzm5dOvijt5vwOMuqtxW1HC4XDqTlfZHnLLZZxTrprTyk9pJbTaW/LfvNU0/9I0esPOePVjxVfPRVfN2qpbls2JJNPw7H2EwY+r6VhJYRtRjJR2ZJey4yUlu696Iwx3JNiOcbruw8q5Sbbe1GcU32ZZP3lq2ppS3HyZXerGlLZNQtTT/UcU3XYkl7L802uPS7zedHraKWjdAV0YJ1SadsZxtq+tBxgoJecU8/Eu9FVZLeY3xmHRx1nHajpDoms6c07HCpNyW1LdGO9ylLqSS3v/53my6ZTfAweuGh54SijF1KM8VznOOxxU1CUY7VNST/AFU15vyFK5n/ABHJM1hrX/eU4tqVGJST3txW1HpbSzjnmvd1ma0frHC7epJqO0pp7pQyW/aT3p7l/EaDt4vH454m2LlbdNO5xg4Q2VFRaa4JbKJax2rlV2Ew10moYyqEIymstq6nPdGxfrNLJpvsy6za1K9saXujvXBL6VBrrj82jCWrpR8fkZzW2jm8RWs3J5Ztvi+kzC38Y+JNP5hF/wCpTfyGYnawd1ef5u5vLsUq4/OLJJIk5BbP0uH+Gkl/7E/kS2b105rbAAWVAAAAAAAAAAAAAAAAfGzlHSV3OWXWfXnbP+KbZ1Fpu/m8PdZ9Sq6fug2cqv2fJGd2nG9YTieqNN4miThXdOEU81FZZL3nmgtMYsrGVrETPa9pmI6bFh9dcdDhen411v5GQr5RsbHisNLxra9JGlKQ2i/x19KfLf23G/lExktyjhY96rk/WRbR14x6easgu7mq8vQ1pM9KY+Ovo+a/uW106/4pP8rXTavB1y963fA2PBco+FklG2nEQ4ZpKFsPXP4EYORTbInipP0tH5HJH2maOvmj3uVs4+NNi9EUbtb8DLhiI+cbI+qIhUzxN+BSfx6rx+VePTZNa8bXfiISqnCyCjFbUXmtrae70MPieK8UW2j471+0XOL4rxRER49E28u5SnyESyvxMe2ut+6b/EmUhbkM/Sr/ANyv5kSaTaumF9gALKgAAAAAAAAAAAAAAAMBr7Zs6OxbX9hcvfFr5nNFnsvyOkuUd/0Ziv3T/wBSObbfZZnfbXj09UFnpbdKL7UXuH4Frp6PQjLsfqVrta0fqs1M+qRZ12laMzZguNsOZSTPoFTbPjkU2zy5AVdo+SmUXMo22gZjRq9nzZVxnFeKGjYZKK7Ir0PuM4rxRhO3REdJM5Dv0u3/AA8v5sCayEeRGeWNsXbRP+ZAm41pplfYACygAAAAAAAAAAAAAAADWuUn/wAZiv3f+6JzbbwOmNf6tvR2LX9xa/4Y7XyOZrOBnfbXj0q4YaThtVS7sn7mecMy6sjtQku2LXwM2kNPlHLhw9D1CwqFOVfYaxb2ytT0rwsKykY/No9q1l2a6lMoysKLme66nIGHxyPcKnxfki/w2B6+LPVtOTS716mdrNK1xtlMFHf4Io43ivFF1g1uk/BFpjOKM2qQeRqeWkEvrVXL0fyJ3IC5IH/SNffC/wDlsn01ppjybAAXUAAAAAAAAAAAAAAAAW+kMNz1VlT4WQsr/ii18zlDEwcdqL4xzT8U8mdbnPPKrq+8HjZyjHKnFbVtby3KTfTh5S3+DRS8L0lp2FZe1sxODs3fAyEJmbaGvXwyk12Nr4lMv8VHpy8c/eiznDIIeGjzzS7D0fUTlGH2Fa7C/wALWWcC/wAMwMlVFJFniV0l4lzXvKGJfSXn6AX+FXQ8WyxxXEyUVlBLuMZdxKwtLfuSCOeka32Qvf8Aka+ZPZCnIjg3LF2W9VVWWf2pyWXwjIms1ppjfYAC6gAAAAAAAAAAAAAAAAYHXTVuGksNKl5KyPTom/1LF8nwZngBylrDq3itHWKOJplWp5uE/arlve5SW7PuLWuR1fjsFVfB13V12wfGE4qcfcyNtZOSGmfTwE+Zlv8AyNkpTrk+6bzcfj5Gc09NYv7Qfi49Pxivgyi68yZdXOSXnHZ/1BTg1GKolVZFrabe0328Fx7WX0+RXD9WMvXjXB/MjxlPnCAp1tPwPCOgNO8jlVqreGv5uVdUKp7cdpWuLf5RtcG8+zqRq+J5Fcat8Z4OfhZZD1iPGTyhFdcW+Bk8LR2m538mGkaeOH2l/dyVnpvNhxGoV1ejqpOp89G66yyKWc1VOMYrPw5tPzGJPKEdKJZWrOxLyNou0TKKeae4wEaXz/7JCYXuIeS+BjJcfNF9iZbjYuTLVuGkMYldGUqKI89Yl7MmpJQrl3Nt7utRZEQtaUq8lGhHhMDGc47NuKfPTz3NQayri/u78vtM3M+JZblwPptEYc8zkABKAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbXaPpn7dVUs+OcIsjTlF1SSnCeEw2ytiW3zcG85uXXl3ZEqAiYymJw5zwmpmOxM1CGGtSf684uutd7kyaNRtVYaMo5vNTusaldYuDfVFdy+bNkBEViE2tMgALKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k="
            alt=""
          />
        </v-avatar>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "BottomNav",
  data() {
    return {
      value: "home",
    };
  },
  computed: {
    ...mapGetters({
      userDto: "getUserDto",
    }),
  },
  methods: {
    gotoProfile() {
      if (this.userDto) {
        this.$router.push("/profile");
      } else {
        this.$router.push("/auth/email");
      }
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
.nav {
  display: block;
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
