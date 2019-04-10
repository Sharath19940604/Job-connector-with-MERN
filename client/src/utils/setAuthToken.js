import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        //Applying to every request
        axios.defaults.headers.common['Authorizaton'] = token;
    
    } else {
        //deleting auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;