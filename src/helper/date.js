import Moment from 'moment'
const date = {
    methods: {
        toDate (unix) {
            if (Moment.unix(unix).format("DD-MM-YYYY") === Moment().format("DD-MM-YYYY")) {
                return Moment.unix(unix).format("HH:mm")
            } else {
                return Moment.unix(unix).format("HH:mm DD-MM-YYYY")
            }
        },
        toDateLeft (unix) {
            if (Moment.unix(unix).format("DD-MM-YYYY") === Moment().format("DD-MM-YYYY")) {
                return Moment.unix(unix).format("HH:mm")
            } else {
                return Moment.unix(unix).format("DD-MM-YYYY")
            }
        }
    }
}
export default date
