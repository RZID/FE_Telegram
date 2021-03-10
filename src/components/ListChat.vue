<template>
  <div class="container">
    <b-link
      class="text-decoration-none text-dark"
      @click="$router.push(`/chat/${data.unique_room}`).catch(() => {})"
    >
      <div class="row">
        <div class="col-3 d-flex justify-content-center">
          <div class="align-self-center">
            <img
              style="height: 50px; width: 50px"
              class="cover"
              v-if="data.type_room == 1"
              :src="
                data.participant.filter(
                  (el) =>
                    el.email_user != $store.getters['auth/getUserData'].email
                )[0].img_photo
                  ? getImage_private(
                      data.participant.filter(
                        (el) =>
                          el.email_user !=
                          $store.getters['auth/getUserData'].email
                      )[0].img_photo
                    )
                  : getImage_private('default.svg')
              "
              @onerror="
                'this.onerror=null; this.src=' + getImage_private('default.svg')
              "
            />
            <img
              class="w-100 h-100 cover"
              style="height: 50px; width: 50px"
              v-else
              :src="
                data.participant.filter(
                  (el) =>
                    el.email_user != $store.getters['auth/getUserData'].email
                )[0].img_photo
                  ? getImage_group(
                      data.participant.filter(
                        (el) =>
                          el.email_user !=
                          $store.getters['auth/getUserData'].email
                      )[0].img_photo
                    )
                  : getImage_group('default.svg')
              "
              @onerror="
                'this.onerror=null; this.src=' + getImage_group('default.svg')
              "
            />
          </div>
        </div>
        <div class="col">
          <div class="align-self-center">
            <div class="d-flex justify-content-between">
              <h5 class="m-0 font-weight-bold" v-if="data.type_room == 1">
                <v-clamp autoresize :max-lines="1">
                  {{
                    data.participant.filter(
                      (el) =>
                        el.email_user !=
                        $store.getters["auth/getUserData"].email
                    )[0].name_user
                  }}
                </v-clamp>
              </h5>
              <p class="pl-3 m-0 text-muted" v-if="data.lastChat[0]">
                <small>
                  {{ toDateLeft(data.lastChat[0].time_chat) }}
                </small>
              </p>
            </div>
            <div class="d-flex justify-content-between" v-if="data.lastChat[0]">
              <v-clamp autoresize :max-lines="2" class="m-0 text-muted d-block">
                {{ data.lastChat[0].text_chat }}
              </v-clamp>
              <div class="align-self-center">
                <span class="badge badge-pill btn-blue d-flex">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-link>
  </div>
</template>
<script>
import io from 'socket.io-client'
import VClamp from 'vue-clamp'
import date from '../helper/date'
export default {
  mixins: [date],
  components: {
    VClamp
  },
  data: () => {
    return {
      image: '',
      socket: io(`${process.env.VUE_APP_BACKEND}`),
    }
  },
  props: [
    'data',
    'lastChat'
  ],
  methods: {
    getImage_private (img) {
      return `${process.env.VUE_APP_BACKEND}/profile-img/${img}`
    },
    getImage_group (img) {
      return `${process.env.VUE_APP_BACKEND}/group-img/${img}`
    }
  },
  mounted () {
  }
}
</script>
<style src="../assets/css/logged.css" scoped>
</style>
<style scoped>
.cover {
  object-fit: cover;
  border-radius: 15px 15px 15px 15px;
}
</style>
