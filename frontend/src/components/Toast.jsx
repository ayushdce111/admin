import {toast} from "react-toastify";

export const handleSuccess = (msg)=>{
    toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        pauseOnBlur: true,
        style: { background: '#FCECDD ',color:"#00809D" },
        });
}

export const handleError = (msg)=>{
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        pauseOnBlur: true,
        });
}