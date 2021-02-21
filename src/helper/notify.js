import { mapActions, mapGetters } from 'vuex'
const notify = {
    methods: {
        ...mapActions({
            getOnlineUsers: 'online/getOnlineUsers',
        })
    },
    computed: {
        ...mapGetters({
            getOnline: 'online/getOnlineState',
        })
    },
    mounted () {
        this.getOnlineUsers()
    }
}
export default notify