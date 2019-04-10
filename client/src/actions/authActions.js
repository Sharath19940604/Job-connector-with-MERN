import axios from 'axios';
import { GET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'
import { SET_CURRENT_USER } from '../actions/types';


export const reguser = (userInfo,history) => dispatch => {
      axios
        .post('/api/users/register', userInfo)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
             );
};

export const luser = userInfo => dispatch => {
    axios
        .post('/api/users/login',userInfo)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken',token);
            setAuthToken(token);
            //decoding token to get user information
            const decoded = jwt_decode(token);
            //setting current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })

        );
};

export const setCurrentUser = (decoded) => {
    return {
        type:SET_CURRENT_USER,
        payload: decoded
    }
    
}