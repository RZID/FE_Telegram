const socket = {
    namespaced: true,
    state: () => {
        return {
            onlineUsers: [],
            listUsers: []
        }
    },
    mutations: {
        setList (state, payload) {
            state.listUsers = payload
        },
        setOnline (state, payload) {
            state.onlineUsers = payload
        }
    },
    actions: {
        setListUsers ({ commit }, data) {
            console.log(data)
            commit('setList', data)
        },
        xgetOnlineUsers ({ commit }, data) {
            commit('setOnline', data)
        }
    },
    getters: {
        getUserState (state) {
            return state.listUsers
        },
        getEmail (state, getters, rootState, rootGetters) {
            return rootGetters['auth/getUserData'].email
        },
        getOnlineState (state) {
            return state.onlineUsers
        }
    }
}
export default socket