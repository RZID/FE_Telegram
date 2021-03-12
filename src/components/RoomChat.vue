<template>
  <div class="h-100vh">
    <div class="navBar shadow" v-if="target.length > 0">
      <div class="d-flex h-100">
        <div class="align-self-center w-100">
          <div class="container">
            <div class="row">
              <div class="d-lg-none col-1 d-flex">
                <b-link
                  @click="$router.push('/chat').catch(() => {})"
                  class="align-self-center"
                >
                  <h4 class="text-blue m-0 fas fa-chevron-left"></h4>
                </b-link>
              </div>
              <div class="col d-flex">
                <div class="mr-3">
                  <img
                    style="height: 50px; width: 50px"
                    class="cover"
                    v-if="target[0].type_room == 1"
                    :src="
                      target[0].img_photo
                        ? getImage_private(target[0].img_photo)
                        : getImage_private('default.svg')
                    "
                    @onerror="
                      'this.onerror=null; this.src=' +
                        getImage_private('default.svg')
                    "
                  /><img
                    style="max-height: 50px"
                    class="w-100 h-100"
                    v-else
                    :src="
                      target[0].img_photo
                        ? getImage_group(target[0].img_photo)
                        : getImage_group('default.svg')
                    "
                    @onerror="
                      'this.onerror=null; this.src=' +
                        getImage_group('default.svg')
                    "
                  />
                </div>
                <div>
                  <b-link
                    class="text-dark text-decoration-none"
                    @click="lookProfile()"
                  >
                    <span v-if="target[0].type_room == 1">
                      <h4 class="m-0 d-md-none">
                        {{
                          target[0].name_user.length > 8
                            ? target[0].name_user
                                .split("")
                                .splice(0, 8)
                                .join("") + "..."
                            : target[0].name_user
                        }}
                      </h4>
                      <h4 class="m-0 d-none d-md-block">
                        {{ target[0].name_user }}
                      </h4>
                      <p class="m-0">
                        <small class="text-blue">{{ getOnline }}</small>
                      </p>
                    </span>
                  </b-link>
                </div>
              </div>
              <div class="col-1 d-flex justify-content-end">
                <b-dropdown variant="link" size="sm" no-caret right no-carets>
                  <template slot="button-content">
                    <span class="align-self-center">
                      <h4 class="m-0 text-blue">
                        <i class="fas fa-ellipsis-v"></i>
                      </h4>
                    </span>
                  </template>
                  <b-dropdown-item>
                    <i class="fas fa-phone"></i> Call
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <i class="fas fa-trash"></i> Delete Chat History
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <i class="fas fa-bell-slash"></i> Mute Notifications
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <i class="fas fa-search"></i> Search
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-light d-flex align-items-end">
      <div class="h-content overflow-auto container px-4 py-3" v-chat-scroll>
        <span v-for="(element, i) in chat" :key="i" class="w-100 h-100">
          <div
            v-if="
              element.email_user == $store.getters['auth/getUserData'].email
            "
            class="w-100 d-flex justify-content-end"
          >
            <div class="my-2 bg-white max-bubble w-100" :class="chatSend(i)">
              <div class="container py-3 text-right">
                {{ element.text_chat }}
                <p class="m-0">
                  <small class="text-muted">
                    {{ toDate(element.time_chat) }}

                    <i class="fas fa-check-double"></i>
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div class="my-2 bg-blue max-bubble" :class="chatReceive(i)" v-else>
            <div class="container py-3">
              {{ element.text_chat }}
              <p class="m-0">
                <small>{{ toDate(element.time_chat) }}</small>
              </p>
            </div>
          </div>
        </span>
      </div>
    </div>
    <div class="inputBar shadow">
      <form class="h-100" @submit.prevent="sendChat()">
        <div class="container d-flex h-100">
          <div class="align-self-center w-100 px-4">
            <div class="input-group">
              <input
                type="text"
                placeholder="Type your message..."
                class="form-control border-0 bg-light br-30px"
                v-model="text"
              />
              <div class="input-group-append">
                <b-dropdown
                  id="dropdown-dropup"
                  dropup
                  text="Drop-Up"
                  variant="light"
                  no-caret
                >
                  <template #button-content>
                    <i class="fas fa-plus text-blue"></i>
                  </template>

                  <b-dropdown-item href="#"
                    ><i class="far fa-image"></i> Images</b-dropdown-item
                  >
                  <b-dropdown-item href="#">
                    <i class="far fa-file"></i> Documents</b-dropdown-item
                  >
                  <b-dropdown-item href="#">
                    <i class="far fa-user"></i>
                    Contacts</b-dropdown-item
                  >
                  <b-dropdown-item v-b-modal.modal-maps>
                    <i class="fas fa-map-marker-alt"></i>
                    Location</b-dropdown-item
                  >
                </b-dropdown>
                <button class="btn btn-light text-blue" type="button">
                  <i class="fas fa-surprise"></i>
                </button>
                <button class="btn btn-light text-blue br-30px" type="button">
                  <i class="fas fa-dice-one"></i>
                </button>
              </div>
            </div>
          </div>
          <transition name="append">
            <div v-if="text" class="align-self-center">
              <button type="submit" class="btn btn-light">
                <h3 class="m-0 text-blue">
                  <i class="fab fa-telegram-plane"></i>
                </h3>
              </button>
            </div>
          </transition>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
import date from "../helper/date";
import { mapGetters } from "vuex";

export default {
  mixins: [date],
  props: ["data"],
  data: () => {
    return {
      chat: [],
      socket: io(`${process.env.VUE_APP_BACKEND}`),
      text: "",
      target: [],
      friendProfile: false,
    };
  },
  methods: {
    chatSend(i) {
      if (i > 0 && i + 1 < this.chat.length) {
        if (
          this.chat[i].email_user === this.chat[i - 1].email_user &&
          this.chat[i].email_user === this.chat[i + 1].email_user
        ) {
          return "chatSquare";
        } else if (this.chat[i].email_user != this.chat[i + 1].email_user) {
          return "sendEnd";
        } else {
          return "sendFirst";
        }
      } else {
        return "sendFirst";
      }
    },
    chatReceive(i) {
      if (i > 0 && i + 1 < this.chat.length) {
        if (
          this.chat[i].email_user === this.chat[i - 1].email_user &&
          this.chat[i].email_user === this.chat[i + 1].email_user
        ) {
          return "chatSquare";
        } else if (this.chat[i].email_user != this.chat[i + 1].email_user) {
          return "receiveEnd";
        } else {
          return "receiveFirst";
        }
      } else {
        if (i === 0) {
          return "receiveFirst";
        } else {
          return "receiveEnd";
        }
      }
    },
    sendChat() {
      this.socket.emit("send-chat", {
        text: this.text,
        to: this.$route.params.chatId,
        from: this.$store.getters["auth/getUserData"].email,
      });
      this.text = "";
    },
    getSendChat() {
      this.socket.on("res-send-chat", (chat) => {
        this.chat = chat;
      });
    },
    getChat() {
      this.socket.emit("get-chat", this.data);
    },
    resGetChat() {
      this.socket.on("res-get-chat", (chat) => {
        this.chat = chat;
      });
    },
    getDataTarget() {
      if (this.$route.params.chatId) {
        const obj = {
          id: this.$route.params.chatId,
          email: this.$store.getters["auth/getUserData"].email,
        };
        this.socket.emit("get-data-target", obj);
      }
    },
    resGetDataTarget() {
      this.socket.on("res-data-target", (data) => {
        this.target = data;
      });
      this.socket.on("updateList", () => {
        const obj = {
          id: this.$route.params.chatId,
          email: this.$store.getters["auth/getUserData"].email,
        };
        this.socket.emit("get-data-target", obj);

        this.socket.on("res-data-target", (data) => {
          this.target = data;
        });
      });
    },
    getImage_private(img) {
      return `${process.env.VUE_APP_BACKEND}/profile-img/${img}`;
    },
    getImage_group(img) {
      return `${process.env.VUE_APP_BACKEND}/group-img/${img}`;
    },
    joinRoom() {
      if (this.$route.params.chatId) {
        this.socket.emit("join-room", this.$route.params.chatId);
      }
    },
    lookProfile() {
      this.$router.push({ query: { page: "friendProfile" } });
    },
  },
  computed: {
    ...mapGetters({
      xgetOnline: "socket/getOnlineState",
    }),
    getOnline() {
      if (
        this.xgetOnline.filter((el) => el.email == this.target[0].email_user)
          .length > 0
      ) {
        return "Online";
      } else {
        return "Offline";
      }
    },
  },
  mounted() {
    this.joinRoom();
    this.getChat();
    this.resGetChat();
    this.getDataTarget();
    this.resGetDataTarget();
  },
};
</script>
<style scoped src="../assets/css/logged.css"></style>
<style scoped src="../assets/css/transition.css"></style>
<style scoped>
.cover {
  object-fit: cover;
  border-radius: 15px;
}
::v-deep .dropdown-menu {
  border-radius: 30px 10px 30px 30px;
  background-color: #7e98df !important;
}
::v-deep .dropdown-item {
  transition: all 0.2s;
  color: white;
}
::v-deep .dropdown-item:hover {
  color: rgb(232, 236, 255);
  background: none;
}
.max-bubble {
  max-width: 400px;
}
.chatSquare {
  border-radius: 10px 10px 10px 10px;
}
.receiveEnd {
  border-radius: 10px 30px 30px 30px;
}
.receiveFirst {
  border-radius: 30px 30px 30px 10px;
}
.sendFirst {
  border-radius: 30px 30px 10px 30px;
}
.sendEnd {
  border-radius: 30px 10px 30px 30px;
}
input:focus {
  box-shadow: none;
}
.w-min-100 {
  width: 100px;
}
.h-100vh {
  height: 100vh;
}
.navBar {
  height: 80px;
}
.h-content {
  height: calc(100vh - 80px - 75px);
}
.inputBar {
  height: 75px;
}
</style>
