import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Alert = (notificationContent,typeOfMsg) => {
    if(notificationContent){
        if(typeOfMsg == "success"){
            notifySuccess(notificationContent)
        } else {
            notifyFail(notificationContent)
        }
    }
    return true;
    
}
const notifySuccess = (message) =>  {    
    toast.success('🚀  '+message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    });
}

const notifyFail = (message) =>  {    
    toast.error('🚀  '+message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    });
}