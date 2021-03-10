<template>
  <div>
    <b-modal id="modal-1" title="BootstrapVue" hide-footer hide-header>
      <h4>Add Room</h4>
      <hr />
      <small
        >* This will create new room even if you had a room with your
        friend</small
      >
      <input
        type="text"
        class="form-control form-control-lg"
        placeholder="Enter your friend's email here"
        v-model="email"
        @input="find()"
      />
      <div class="container bg-light my-2 py-2">
        <span v-if="suggested.length > 0">
          <div v-for="(element, i) in suggested" :key="i">
            <b-link
              @click="addNewRoom(element.email_user)"
              class="text-dark text-decoration-none"
            >
              <div class="row d-flex">
                <div class="col-4">
                  <img
                    class="w-100 h-100"
                    :src="getImage(element.img_photo)"
                    alt=""
                  />
                </div>
                <div class="col align-self-center h-100">
                  <h4 class="font-weight-bold m-0">
                    {{ element.name_user }}
                  </h4>
                  <hr class="m-0" />
                  <p class="m-0">
                    {{ element.bio_user }}
                  </p>
                </div>
              </div>
            </b-link>
          </div>
        </span>
        <span v-else> Nothing found </span>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data: () => {
    return {
      email: "",
      suggested: [],
    };
  },
  methods: {
    getImage(image) {
      return `${process.env.VUE_APP_BACKEND}/profile-img/${image}`;
    },
    find() {
      Axios.get(
        `${process.env.VUE_APP_BACKEND}/find?email=${this.email}&me=${this.$store.getters["auth/getUserData"].email}`,
        {
          headers: {
            token: this.$store.getters["auth/getToken"],
          },
        }
      )
        .then((res) => {
          this.suggested = res.data.message.filter(
            (el) =>
              el.email_user != this.$store.getters["auth/getUserData"].email
          );
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addNewRoom(email) {
      Axios.post(
        `${process.env.VUE_APP_BACKEND}/addRoom`,
        {
          participant1: email,
          participant2: this.$store.getters["auth/getUserData"].email,
        },
        {
          headers: {
            token: this.$store.getters["auth/getToken"],
          },
        }
      )
        .then((res) => {
          this.$router.push(`/chat/${res.data.message}`);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
