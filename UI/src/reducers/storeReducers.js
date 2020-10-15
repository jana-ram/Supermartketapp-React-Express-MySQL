import {
    CommonConstant
} from '../constant';
const initialState = {
    payload : "",
    type:'',
    error : ""
}

export default function storeReducers(state = initialState, action) {
    switch (action.type) {
        case CommonConstant.GETSTORELISTSUCCESS:
          return {
            payload: action.payload,
            type: action.type,
            count : action.count,
            error:action.error
          }; 
        case CommonConstant.GETSTORELISTFAIL:
          return {
            payload: "",
            type: action.type,
            count : action.count,
            error:action.error
          };   
        case CommonConstant.GETSTOREDETAILBYIDSUCCESS:
          return {
            payload: action.payload,
            type: action.type,
            error:action.error
          }; 
        case CommonConstant.GETSTOREDETAILBYIDFAIL:
          return {
            payload: "",
            type: action.type,
            error:action.error
          };
        case CommonConstant.ADDEDITSTORESUCCESS:
          return {
            payload: action.payload,
            type: action.type,
            error:action.error
          }; 
        case CommonConstant.ADDEDITSTOREFAIL:
          return {
            payload: "",
            type: action.type,
            error:action.error
          };    
        default:
          return initialState
      }
}