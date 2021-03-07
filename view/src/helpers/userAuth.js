// const apiURL = process.env.REACT_APP_API_URL;

export const saveJWT = (data, type) => {
    localStorage.setItem('token', data);
    type && localStorage.setItem('type', type);
};

// export function loginStatus(){
//     return localStorage.getItem('token');
// };

// export const getJWT = () => {
//     const token = localStorage.getItem('token');

//     if(!token){
//         store.dispatch({type: LOGOUT_SUCCESS});
//         history.push('/login');
//         return null;
//     }

//     const jwtParsed = JSON.parse(token);
//     const decoded = decode(jwtParsed.jwt);
//     if(decoded.exp - Date.now()/1000 < 60){
//         return axios.put(apiURL + `/user/${decoded.userId}/token`, {refreshToken: jwtParsed.refreshToken})
//         .then((res) => {
//             saveJWT(res.data)
//             return Promise.resolve(res.data);
//         })
//         .catch((err) => {})
//     }

//     return Promise.resolve(jwtParsed);
// };

// export const removeJWT = () => {
//     localStorage.removeItem('token');
// };