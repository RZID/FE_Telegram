<template>
  <div class="h-100vh">
    <AddFriend />
    <div class="h-100">
      <div class="row no-gutters h-100">
        <div
          class="h-100vh col-md-3 border-right overflow-auto"
          :class="$route.params.chatId ? 'd-none d-lg-block' : ''"
          v-if="$route.query.page === 'setting'"
        >
          <div>
            <div class="container py-3">
              <div class="row d-flex">
                <div class="col-1 align-self-center">
                  <b-link @click="$router.replace({ query: {} })">
                    <h4 class="m-0 text-blue">
                      <i class="fas fa-chevron-left"></i>
                    </h4>
                  </b-link>
                </div>
                <div class="col align-self-center">
                  <h5 class="text-blue m-0">
                    {{ $store.getters["auth/getUserData"].email }}
                  </h5>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <div class="container pt-4">
                  <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                      <span class="align-self-center">
                        <input
                          type="file"
                          id="setPhoto"
                          style="display: none"
                          accept="image/png, image/jpeg"
                          @input="sendFile"
                        />
                        <b-link
                          onclick="document.getElementById('setPhoto').click();"
                        >
                          <img
                            style="height: 100px; width: 100px"
                            class="cover"
                            :src="
                              urlImage
                                ? urlImage
                                : userData.img_photo
                                ? getImage(userData.img_photo)
                                : getImage('default.svg')
                            "
                            @onerror="
                              'this.onerror=null; this.src=' + urlImage
                                ? urlImage
                                : getImage('default.svg')
                            "
                          />
                        </b-link>
                      </span>
                    </div>
                    <div class="col d-flex justify-content-center">
                      <div class="pt-3 align-self-center">
                        <h4 class="text-center">{{ userData.name_user }}</h4>
                        <p class="text-muted text-md-center">
                          {{ userData.email_user }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="pt-3">
                    <h5 class="font-weight-bold">Account</h5>
                    <p class="m-0">+375(29)9638433</p>
                    <p class="text-blue">Tap to change phone number</p>
                  </div>
                  <hr />
                  <div class="pt-3">
                    <h5 class="font-weight-bold">Name</h5>
                    <input
                      class="m-0 form-control p-0"
                      :disabled="inputName"
                      v-model="userData.name_user"
                    />
                    <b-link
                      class="text-decoration-none text-blue"
                      v-if="inputName"
                      @click="inputName = false"
                    >
                      Tap to change name
                    </b-link>
                    <b-link
                      class="text-decoration-none text-blue"
                      v-if="!inputName"
                      @click="submitName()"
                    >
                      Apply
                    </b-link>
                  </div>
                  <hr />
                  <div class="py-3">
                    <h6 class="font-weight-bold">
                      {{ userData.bio_user }}
                    </h6>
                    Bio
                  </div>
                  <div v-if="userData.lat_user && userData.long_user">
                    Location
                    <Maps
                      v-if="render"
                      :lat="userData.lat_user"
                      :long="userData.long_user"
                    />
                    <div>
                      <div class="w-100">
                        <form @submit.prevent="setLocation()">
                          <div class="mb-3">
                            <input
                              class="form-control mt-2 w-100"
                              placeholder="Latitude"
                              v-model="userData.lat_user"
                              type="text"
                            />
                            <input
                              class="form-control mt-2 w-100"
                              placeholder="Longitude"
                              v-model="userData.long_user"
                              type="text"
                            />
                          </div>
                          <div class="w-100 text-right">
                            <button class="btn btn-success">
                              Set Location
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="pt-3">
                    <h5 class="font-weight-bold">Settings</h5>
                    <div class="d-flex justify-content-between py-2">
                      <div class="d-flex">
                        <h6 class="far fa-bell text-blue mr-4"></h6>
                        <h6 class="text-blue">Notifications and Sounds</h6>
                      </div>
                      <h6 class="fas fa-chevron-right text-blue"></h6>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div class="d-flex">
                        <h6 class="fas fa-lock text-blue mr-4"></h6>
                        <h6 class="text-blue">Privacy and Security</h6>
                      </div>
                      <h6 class="fas fa-chevron-right text-blue"></h6>
                    </div>
                    <div class="d-flex justify-content-between py-2">
                      <div class="d-flex">
                        <h6 class="fas fa-chart-line text-blue mr-4"></h6>
                        <h6 class="text-blue">Data and Storage</h6>
                      </div>
                      <h6 class="fas fa-chevron-right text-blue"></h6>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div class="d-flex">
                        <h6 class="far fa-comment-dots text-blue mr-4"></h6>
                        <h6 class="text-blue">Chat settings</h6>
                      </div>
                      <h6 class="fas fa-chevron-right text-blue"></h6>
                    </div>
                    <div class="d-flex justify-content-between py-2">
                      <div class="d-flex">
                        <h6 class="fas fa-laptop text-blue mr-4"></h6>
                        <h6 class="text-blue">Devices</h6>
                      </div>
                      <h6 class="fas fa-chevron-right text-blue"></h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="col-md-3 border-right"
          :class="$route.params.chatId ? 'd-none d-lg-block' : ''"
        >
          <div class="container py-3 h-200px">
            <div class="row no-gutters">
              <div class="col">
                <h3 class="text-blue">Telegram</h3>
              </div>
              <div class="col-2 d-flex justify-content-end">
                <b-dropdown variant="link" size="sm" right no-caret>
                  <template slot="button-content">
                    <span class="align-self-center">
                      <h3 class="m-0 text-blue text-right">
                        <i class="fas fa-stream"></i>
                      </h3>
                    </span>
                  </template>
                  <b-dropdown-item
                    class="py-2"
                    @click="$router.push('?page=setting')"
                  >
                    <i class="fas fa-cog"></i>
                    Settings
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <i class="far fa-user"></i>
                    Contacts
                  </b-dropdown-item>
                  <b-dropdown-item class="py-2">
                    <i class="fas fa-phone"></i>
                    Calls
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <i class="fas fa-save"></i>
                    Save Messages
                  </b-dropdown-item>
                  <b-dropdown-item class="py-2">
                    <i class="fas fa-user-plus"></i>
                    Invite Friends
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <i class="far fa-question-circle"></i>
                    Telegram FAQ
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
            <div class="row no-gutters pt-4">
              <div class="col d-flex">
                <span class="align-self-center w-100">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text bg-light border-0"
                        id="basic-addon2"
                      >
                        <i class="fas fa-search"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      placeholder="Search"
                    />
                  </div>
                </span>
              </div>
              <div class="col-2 d-flex justify-content-end">
                <span class="align-self-center">
                  <b-link v-b-modal.modal-1>
                    <h3 class="text-blue">
                      <i class="fas fa-plus"></i>
                    </h3>
                  </b-link>
                </span>
              </div>
            </div>
            <div>
              <div class="row no-gutters pt-3">
                <div class="col">
                  <button class="btn btn-block btn-blue br-30px">All</button>
                </div>
                <div class="col">
                  <button class="btn btn-block">Important</button>
                </div>
                <div class="col">
                  <button class="btn btn-block">Unread</button>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-auto h-remaining-header w-100">
            <span v-if="getUserData.length > 0">
              <div v-for="(element, i) in getUserData" :key="i">
                <ListChat class="pb-3" :data="element" />
              </div>
            </span>
            <div
              v-else
              class="d-flex h-remaining-header justify-content-center"
            >
              <div class="align-self-center">
                <div class="align-self-center">
                  <b-link class="text-decoration-none">
                    <h3 class="text-blue">Feel lonely?</h3>
                    <p class="text-muted">Start chat with your contact</p>
                  </b-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col overflow-auto h-100"
          :class="
            $route.query.page === 'friendProfile' ? 'd-none d-lg-block' : ''
          "
        >
          <div v-if="$route.params.chatId">
            <roomChat
              :data="$route.params.chatId"
              :key="$route.params.chatId"
            />
          </div>
          <div v-else class="h-100 d-flex justify-content-center">
            <div class="align-self-center">
              <h4 class="text-muted">
                Please select a chat to start messaging
              </h4>
            </div>
          </div>
        </div>
        <div
          class="col-12 col-lg-3"
          v-if="$route.query.page === 'friendProfile'"
        >
          <div class="container pt-4 w-100 ">
            <div class="row d-flex mb-3">
              <div class="col-1 align-self-center">
                <b-link
                  @click="$router.push({ query: {} }).catch(() => {})"
                  class="text-blue text-decoration-none"
                >
                  <h3 class="m-0">
                    <i class="fas fa-chevron-left"></i>
                  </h3>
                </b-link>
              </div>
              <div class="col align-self-center">
                <h5 class="m-0 text-blue">
                  {{
                    getUserData
                      .filter((el) => el.unique_room == $route.params.chatId)[0]
                      .participant.filter(
                        (el) =>
                          el.email_user !=
                          $store.getters["auth/getUserData"].email
                      )[0].email_user
                  }}
                </h5>
              </div>
            </div>
            <div class="text-center w-100 mb-3">
              <img
                class="square-image "
                :src="
                  getImage(
                    getUserData
                      .filter((el) => el.unique_room == $route.params.chatId)[0]
                      .participant.filter(
                        (el) =>
                          el.email_user !=
                          $store.getters['auth/getUserData'].email
                      )[0].img_photo
                  )
                "
                alt=""
              />
            </div>
            <div class="text-center">
              <h5 class="font-weight-bold m-0">
                {{
                  getUserData
                    .filter((el) => el.unique_room == $route.params.chatId)[0]
                    .participant.filter(
                      (el) =>
                        el.email_user !=
                        $store.getters["auth/getUserData"].email
                    )[0].name_user
                }}
              </h5>
              <hr class=" m-0" />
              <p>
                {{
                  getUserData
                    .filter((el) => el.unique_room == $route.params.chatId)[0]
                    .participant.filter(
                      (el) =>
                        el.email_user !=
                        $store.getters["auth/getUserData"].email
                    )[0].bio_user
                }}
              </p>
            </div>
          </div>
          <div class="container">
            <h5 class="font-weight-bold">Location</h5>
            <div
              v-if="
                getUserData
                  .filter((el) => el.unique_room == $route.params.chatId)[0]
                  .participant.filter(
                    (el) =>
                      el.email_user != $store.getters['auth/getUserData'].email
                  )[0]
              "
            >
              <Maps
                :lat="
                  getUserData
                    .filter((el) => el.unique_room == $route.params.chatId)[0]
                    .participant.filter(
                      (el) =>
                        el.email_user !=
                        $store.getters['auth/getUserData'].email
                    )[0].lat_user
                "
                :long="
                  getUserData
                    .filter((el) => el.unique_room == $route.params.chatId)[0]
                    .participant.filter(
                      (el) =>
                        el.email_user !=
                        $store.getters['auth/getUserData'].email
                    )[0].long_user
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListChat from "../components/ListChat.vue";
import roomChat from "../components/RoomChat.vue";
import AddFriend from "../components/MdAdd";
import Maps from "../components/Maps";
import chatList from "../helper/chatList";
import Axios from "axios";
import Alert from "../helper/swal";
export default {
  mixins: [chatList, Alert],
  components: {
    ListChat,
    roomChat,
    AddFriend,
    Maps,
  },
  data: () => {
    return {
      render: true,
      form: {},
      userData: {},
      urlImage: "",
      inputName: true,
    };
  },
  methods: {
    sendFile(e) {
      const file = e.target.files[0];
      if (file["type"] !== "image/jpeg" && file["type"] !== "image/png") {
        this.toastDanger("Please insert image with format jpg/jpeg/png");
      } else {
        this.urlImage = URL.createObjectURL(file);
        let formData = new FormData();
        formData.append("image", file);
        formData.append("email", this.$store.getters["auth/getUserData"].email);
        Axios.post(`${process.env.VUE_APP_BACKEND}/setProfile/`, formData, {
          headers: {
            token: this.$store.getters["auth/getToken"],
          },
        })
          .then(() => {
            this.socket.emit("change-profile");
          })
          .catch((err) => console.error(err.response));
      }
    },
    setLocation() {
      const lat = this.userData.lat_user;
      const long = this.userData.long_user;
      if (lat && long) {
        Axios.post(
          `${process.env.VUE_APP_BACKEND}/setLocation`,
          {
            email: this.$store.getters["auth/getUserData"].email,
            lat: lat,
            long: long,
          },
          {
            headers: {
              token: this.$store.getters["auth/getToken"],
            },
          }
        )
          .then(() => {
            this.socket.emit("change-profile");
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            this.render = false;
            this.$nextTick().then(() => {
              this.render = true;
            });
          });
      }
    },
    submitName() {
      if (this.userData.name_user) {
        Axios.post(
          `${process.env.VUE_APP_BACKEND}/changeName`,
          {
            email: this.$store.getters["auth/getUserData"].email,
            name: this.userData.name_user,
          },
          {
            headers: {
              token: this.$store.getters["auth/getToken"],
            },
          }
        )
          .then(() => {
            this.socket.emit("change-profile");
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            this.inputName = true;
          });
      }
    },
    getImage(img) {
      return `${process.env.VUE_APP_BACKEND}/profile-img/${img}`;
    },
    login() {
      this.socket.emit(
        "logged-in",
        this.$store.getters["auth/getUserData"].email
      );
    },
    getUser() {
      Axios.post(
        `${process.env.VUE_APP_BACKEND}/user`,
        {
          email: this.$store.getters["auth/getUserData"].email,
        },
        {
          headers: {
            token: this.$store.getters["auth/getToken"],
          },
        }
      )
        .then((res) => {
          this.userData = res.data.message[0];
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
  },
  mounted() {
    this.login(), this.getUser();
  },
};
</script>
<style src="../assets/css/logged.css" scoped></style>
<style scoped>
.form-control:disabled {
  border: none;
  background: none;
}
input:focus {
  box-shadow: none;
}
.cover {
  object-fit: cover;
  border-radius: 30px 30px 30px 30px;
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
</style>
