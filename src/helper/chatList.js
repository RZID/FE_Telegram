import { mapActions, mapGetters } from 'vuex'
import io from 'socket.io-client'
const list = {
    data: () => {
        return {
            socket: io(`${process.env.VUE_APP_BACKEND}`)
        }
    },
    methods: {
        ...mapActions({
            xSetListUsers: 'socket/setListUsers',
            xgetOnlineUsers: 'socket/xgetOnlineUsers',
        }),
        setListUsers (params) {
            if (params) {
                this.socket.emit('get-user-list', {
                    roomId: params,
                    email: this.$store.getters['auth/getUserData'].email
                })
            } else {
                this.socket.emit('get-user-list', {
                    email: this.$store.getters['auth/getUserData'].email
                })
            }
            this.socket.on('res-user-list', (users) => {
                this.xSetListUsers(users)
            })
            this.socket.on('updateList', () => {
                if (params) {
                    this.socket.emit('get-user-list', {
                        roomId: params,
                        email: this.$store.getters['auth/getUserData'].email
                    })
                } else {
                    this.socket.emit('get-user-list', {
                        email: this.$store.getters['auth/getUserData'].email
                    })
                }
            })
        },
        getOnlineUsers () {
            this.socket.on('onlined', (res) => {
                this.xgetOnlineUsers(res)
            })
            this.socket.on('disconnect', (res) => {
                this.xgetOnlineUsers(res)
            })
        },
        hSendChat (text) {
            this.socket.emit('send-chat', {
                text: text,
                to: this.$route.params.chatId,
                from: this.$store.getters['auth/getUserData'].email
            })
        }
    },
    computed: {
        ...mapGetters({
            getUserState: 'socket/getUserState',
            getOnline: 'socket/getOnlineState'
        }),
        getUserData () {
            return this.getUserState
        }
    },
    mounted () {
        this.setListUsers(this.$route.params.chatId)
        this.getOnlineUsers()
    }
}
export default list
