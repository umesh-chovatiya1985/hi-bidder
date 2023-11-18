import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function ToastModal({ type, message } : any) {
    switch(type){
        case "Error":
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            break;
        case "Success":
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            break;
        case "Warning":
            toast.warn(message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            break;
        case "Info":
            toast.info(message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            break;
        default:
            toast(message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark"
            });
    }
    return (
        <>
            
        </>
    );
}