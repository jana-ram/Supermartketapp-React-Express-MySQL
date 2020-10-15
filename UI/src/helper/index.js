import { config } from '../config';
export function authHeader() {
    let authDetail = JSON.parse(localStorage.getItem('users'));
    if (authDetail) {
        const {
            accessToken
        } = authDetail;
        return { 
            'authorization': 'bearer ' +accessToken,
            'content-type': 'application/json',
        };
    } else {
        return {
            'content-type': 'application/json'
        };
    }
}
export function endPointConnect(url , data , succssType , failType ,dispatch) {
    fetch(`${config.apiUrl}`+url, data)
    .then(response => response.json())
    .then(res => {
        const {
            success,
            data,
            message,
            count
        } = res;
        if(success == 403 || success == 401){
            localStorage.removeItem("users");
            window.location.href ='/';
        }
        if (success == 1) {
            dispatch({            
                type :succssType,
                payload : data,
                error : message,
                count : count
            });
        } else {
            dispatch({            
                type : failType,
                payload : "",
                error : message,
                count : 0
            });
        }
    });
}
export function authDetail(){
    let user = JSON.parse(localStorage.getItem('users'));  
    if (user) {        
        return user;
    } else{
        return { 
            cpUserID :"",
            cpUserName : "",
            cpUserRole:"",
            cpUserGUID : "",
            cpAccessToken:"",
            cpAgentcode:"",
            cpEmailId : "",
            cpCurrentRole:""
        }; 
    }
}