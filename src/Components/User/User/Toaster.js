import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast:true,
    position:"center",
    showConfirmButton:false,
    timer:5000,
    timerProgressBar:true,
    onOpen:(toast)=>{
        toast.addEventListener("mouseenter",Swal.stopTimer);
        toast.addEventListener("mouseleave",Swal.resumeTimer);
    }
})

const makeToast = (type, msg) => {
    Toast.fire({
        icon:type,
        title:msg,
    })
}

export default  makeToast;