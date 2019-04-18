import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReudcer from './profileReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReudcer

}); 