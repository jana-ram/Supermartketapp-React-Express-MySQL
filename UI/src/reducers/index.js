import { combineReducers } from 'redux';
import authReducers from './authReducers';
import alertReducers from './alertReducers';
import storeReducers from './storeReducers';
export default combineReducers({
    auth:authReducers,
    alertNotification : alertReducers,
    store : storeReducers
});