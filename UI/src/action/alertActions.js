import {
    CommonConstant
 } from '../constant';
 export const alertNotification = (message , className) => async dispatch => { 
    dispatch({            
        type : CommonConstant.NOTIFICATIONSUCCESS,
        payload : message,
        notificationType : className
    }); 
}
export const clearNotification = () => async dispatch => { 
    dispatch({            
        type : CommonConstant.NOTIFICATIONCLEAR,
        payload : "",
        notificationType : ""
    }); 
}