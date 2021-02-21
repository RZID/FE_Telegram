import Swal from 'sweetalert2'
const swal = {
    data: () => {
        return {
            Toast: Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
        }
    },
    methods: {
        AlertError (message) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message
            })
        },
        toastSuccess (message) {
            this.Toast.fire({
                icon: 'success',
                title: message
            })
        },
        toastDanger (message) {
            this.Toast.fire({
                icon: 'error',
                title: message
            })
        },
        confirm (message) {
            return new Promise((resolve) => {
                Swal.fire({
                    icon: 'question',
                    title: message,
                    showCancelButton: true,
                    confirmButtonText: 'Sure'
                }).then((result) => {
                    if (result.isConfirmed) {
                        resolve(true)
                    }
                })
            })
        }
    }
}
export default swal