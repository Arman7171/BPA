import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

const request = (url, method='get', body) => {
    console.log('body----', body);
    var token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    
    console.log(config);
    if(body){
        return axios[method](apiURL + url, body, config)
    }
    else{
        return axios[method](apiURL + url, config)
    }
}

export default request;