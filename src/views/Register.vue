<template>
  <div class="bg-all overflow-auto">
    <div class="h-100vh container-md container-fluid">
      <div class="h-100 d-flex justify-content-center row no-gutters">
        <div class="col-md-5 align-self-center">
          <div class="card border-0 px-3 br-30px shadow">
            <div class="card-body">
              <div class="d-flex w-100">
                <b-link
                  class="text-blue my-3 position-absolute"
                  @click="$router.push('/login')"
                >
                  <h4>
                    <i class="fas fa-chevron-left"></i>
                  </h4>
                </b-link>
                <h4 class="text-blue my-3 w-100 text-center">Register</h4>
              </div>
              <p class="font-weight-bold my-3 text-muted">
                Let's create your account!
              </p>
              <form action="" @submit.prevent="send()">
                <div class="form-group">
                  <label class="m-0" for="name">Name</label>
                  <input
                    type="text"
                    class="form-control py-0 border-top-0 border-left-0 border-right-0"
                    id="name"
                    v-model="name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="m-0" for="email">Email</label>
                  <input
                    type="email"
                    class="form-control py-0 border-top-0 border-left-0 border-right-0"
                    id="email"
                    v-model="email"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="m-0" for="pass">Password</label>
                  <div class="input-group">
                    <input
                      type="password"
                      class="form-control py-0 border-top-0 border-left-0 border-right-0"
                      id="pass"
                      v-model="pass"
                      required
                    />
                    <div class="input-group-append">
                      <span
                        class="input-group-text bg-white border-top-0 border-right-0"
                      >
                        <b-link class="text-dark">
                          <i class="far fa-eye"></i>
                        </b-link>
                      </span>
                    </div>
                  </div>
                </div>
                <button class="btn btn-lg btn-blue btn-block rounded-btn">
                  Register
                </button>
                <div class="row py-4">
                  <div class="col">
                    <hr />
                  </div>
                  <div class="col d-flex justify-content-center">
                    <span class="align-self-center"> Register With </span>
                  </div>
                  <div class="col">
                    <hr />
                  </div>
                </div>
                <button
                  class="btn btn-lg btn-outline-blue btn-block rounded-btn"
                >
                  <i class="fab fa-google"></i> Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import swal from "../helper/swal";
export default {
  mixins: [swal],
  data: () => {
    return {
      name: "",
      email: "",
      pass: "",
    };
  },
  methods: {
    send() {
      const data = {
        name: this.name,
        email: this.email,
        pass: this.pass,
      };
      Axios.post(`${process.env.VUE_APP_BACKEND}/register`, data)
        .then((res) => {
          this.toastSuccess(res.data.message);
          this.$router.push("/login");
        })
        .catch((err) => {
          if (err) {
            if (err.response) {
              console.log(err.response);
              this.AlertError(err.response.data.message);
            } else {
              this.AlertError("Oops... We had trouble");
            }
          }
        });
    },
  },
};
</script>
<style src="../assets/css/prelog.css" scoped></style>
