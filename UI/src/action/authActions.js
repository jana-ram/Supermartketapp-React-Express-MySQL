import {
    AuthConstant
} from '../constant';
import { authHeader , endPointConnect } from '../helper';
export const loginRequest = (data) => dispatch => {
    try{
        const {
            username,
            password
        } = data;
        const requestData = {
            method : 'POST',
            headers: authHeader(),
            body:JSON.stringify({
                username,
                password
            }) 
        };
        endPointConnect(
            'api/auth/signin' , 
            requestData , 
            AuthConstant.LOGINSUCCESS , 
            AuthConstant.LOGINFAIL, 
            dispatch
        );

    } catch(err) {
        dispatch({
            type : AuthConstant.LOGINFAIL,
            payload : "",
            error : AuthConstant.DEFAULTERR
        })
    }
}