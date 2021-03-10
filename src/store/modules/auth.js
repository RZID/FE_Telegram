import Axios from 'axios'
const auth = {
    namespaced: true,
    state: () => {
        return {
            token: localStorage.getItem('token') || null,
            name: localStorage.getItem('name') || null,
            email: localStorage.getItem('email') || null
        }
    },
    getters: {
        getToken (state) {
            return state.token
        },
        getUserData (state) {
            return {
                name: state.name,
                email: state.email
            }
        }
    },
    mutations: {
        setToken (state, payload) {
            localStorage.setItem('token', payload.token)
            state.token = payload.token
            localStorage.setItem('name', payload.name)
            state.name = payload.name
            localStorage.setItem('email', payload.email)
            state.email = payload.email
        }
    },
    actions: {
        login (context, payload) {
            return new Promise((resolve, reject) => {
                Axios.post(`${process.env.VUE_APP_BACKEND}/login`, payload).then((res) => {
                    context.commit('setToken', {
                        token: res.data.message.token,
                        name: res.data.message.name,
                        email: res.data.message.email
                    })
                    resolve(res)
                }).catch(err => {
                    reject(err.response.data.message)
                })
            })
        },
        register (context, payload) {
            return new Promise((resolve, reject) => {
                Axios.post(`${process.env.VUE_APP_BACKEND}/register`, payload).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}
export default auth
