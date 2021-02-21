<template>
  <div>
    <b-modal id="modal-1" title="BootstrapVue" hide-footer hide-header>
      <h4>Find Friend</h4>
      <hr />
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
            {{ element }}
          </div>
        </span>
        <span v-else> Nothing found </span>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  data: () => {
    return {
      email: '',
      suggested: []
    }
  },
  methods: {
    find () {
      Axios.get(`${process.env.VUE_APP_BACKEND}/find?email=${this.email}&me=${this.$store.getters['auth/getUserData'].email}`, {
        headers: {
          'token': this.$store.getters['auth/getToken']
        }
      }).then((res) => {
        this.suggested = res.data.message
      }).catch((err) => {
        console.error(err)
      })
    }
  }
}
</script>
