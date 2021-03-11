<template>
  <div class="bg-all overflow-auto">
    <div class="h-100vh container-md container-fluid">
      <div class="h-100 d-flex justify-content-center row no-gutters">
        <div class="col-md-5 align-self-center">
          <div class="card border-0 px-3 br-30px shadow">
            <div class="card-body">
              <h4 class="text-center text-blue my-3">Login</h4>
              <p class="font-weight-bold my-3 text-muted">Hi, Welcome back!</p>
              <form action="" @submit.prevent="send()">
                <div class="form-group">
                  <label class="m-0" for="email">Email</label>
                  <input
                    type="email"
                    class="form-control border-top-0 border-left-0 border-right-0"
                    id="email"
                    v-model="email"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="m-0" for="pass">Password</label>
                  <input
                    type="password"
                    class="form-control py-0 border-top-0 border-left-0 border-right-0"
                    id="pass"
                    v-model="pass"
                    required
                  />
                </div>
                <div class="text-right mb-3">
                  <b-link class="text-blue">Forgot Password?</b-link>
                </div>
                <button class="btn btn-lg btn-blue btn-block rounded-btn">
                  Login
                </button>
                <div class="row py-4">
                  <div class="col">
                    <hr />
                  </div>
                  <div class="col d-flex justify-content-center">
                    <span class="align-self-center"> Login With </span>
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
                <div class="text-center pt-3">
                  Don't have an account?
                  <b-link class="text-blue" @click="$router.push('/register')">
                    Sign Up</b-link
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import swal from "../helper/swal";
export default {
  mixins: [swal],
  data: () => {
    return {
      email: "",
      pass: "",
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    send() {
      const body = {
        email: this.email,
        pass: this.pass,
      };
      this.login(body)
        .then(() => {
          this.toastSuccess(`Welcome ${localStorage.getItem("name")}`);
          this.$router.push("/chat");
        })
        .catch((err) => {
          this.toastDanger(err);
        });
    },
  },
};
</script>
<style src="../assets/css/prelog.css" scoped></style>
