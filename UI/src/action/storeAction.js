import {
    CommonConstant
} from '../constant';
import { authHeader , endPointConnect } from '../helper';
export const getStoreList = (data) => dispatch => {
    try{
        const {
            searchKey,
            offset,
            limit
        } = data;
        const requestData = {
            method : 'POST',
            headers: authHeader(),
            body : JSON.stringify({
                searchKey,
                offset,
                limit
            })
        };
        endPointConnect(
            'api/stores' , 
            requestData , 
            CommonConstant.GETSTORELISTSUCCESS , 
            CommonConstant.GETSTORELISTFAIL, 
            dispatch
        );

    } catch(err) {
        dispatch({
            type : CommonConstant.GETSTORELISTFAIL,
            payload : "",
            error : CommonConstant.DEFAULTERR
        })
    }
}

export const storeAddEdit = (data) => dispatch => {
    try{
        const {
            storeName,
            phone,
            address,
            email,
            storeId            
        } = data;
        const requestData = {
            method : 'POST',
            headers: authHeader(),
            body : JSON.stringify({
                storeName,
                phone,
                address,
                email,
                storeId 
            })
        };
        endPointConnect(
            'api/insertOrUpdateStore' , 
            requestData , 
            CommonConstant.ADDEDITSTORESUCCESS , 
            CommonConstant.ADDEDITSTOREFAIL, 
            dispatch
        );

    } catch(err) {
        dispatch({
            type : CommonConstant.ADDEDITSTOREFAIL,
            payload : "",
            error : CommonConstant.DEFAULTERR
        })
    }
}

export const getStoreDetailById = (storeId) => dispatch => {
    try{
        const requestData = {
            method : 'GET',
            headers: authHeader()
        };
        endPointConnect(
            'api/getStore?ref='+storeId , 
            requestData , 
            CommonConstant.GETSTOREDETAILBYIDSUCCESS , 
            CommonConstant.GETSTOREDETAILBYIDFAIL, 
            dispatch
        );

    } catch(err) {
        dispatch({
            type : CommonConstant.GETSTOREDETAILBYIDFAIL,
            payload : "",
            error : CommonConstant.DEFAULTERR
        })
    }
}