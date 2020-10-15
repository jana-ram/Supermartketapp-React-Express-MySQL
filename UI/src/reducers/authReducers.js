import {
    AuthConstant
} from '../constant';

const initialState = {
    type : "",
    payload : "",
    error  : ""
};

export default function authReducers(state = initialState , action){
    switch(action.type) {
        case AuthConstant.LOGINSUCCESS :
            return {
                type : action.type,
                payload : action.payload,
                error:action.error
            }
        case AuthConstant.LOGINFAIL :
            return {
                type : action.type,
                payload : action.payload,
                error:action.error
            }
        case AuthConstant.REGISTRATIONSUCCESS :
            return {
                type : action.type,
                payload : action.payload,
                error:action.error
            }
        case AuthConstant.REGISTRATIONFAIL :
            return {
                type : action.type,
                payload : action.payload,
                error:action.error
            }
        default:
            return initialState
    }

}