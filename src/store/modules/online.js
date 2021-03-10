import io from 'socket.io-client'
const online = {
    namespaced: true,
    state: () => {
        return {
            onlineUsers: []
        }
    },
    mutations: {
        setOnline (state, payload) {
            state.onlineUsers = payload
        }
    },
    actions: {
        getOnlineUsers ({ commit }) {
            io(`${process.env.VUE_APP_BACKEND}`).on('onlined', (res) => {
                commit('setOnline', res)
            })
            io(`${process.env.VUE_APP_BACKEND}`).on('disconnect', (res) => {
                commit('setOnline', res)
            })
        }
    },
    getters: {
        getOnlineState (state) {
            return state.onlineUsers
        }
    }
}
export default online
