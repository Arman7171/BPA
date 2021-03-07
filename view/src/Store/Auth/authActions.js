import request from '../../helpers/requests';
import * as actionTypes from './authActionsType';
import { saveJWT } from "../../helpers/userAuth";

export const signIn = (data) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING })
        request(`/login`, 'post', data)
        .then(res => {
            console.log(res.data);
            saveJWT(res.data.token, res.data?.type);
            dispatch({ type: actionTypes.LOGIN_SUCCESS});
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.response.data.message})
        })
    }
};

// export const signUp = (data) => {
//     return (dispatch) => {
//         dispatch({ type: actionTypes.AUTH_LOADING })
//         request(`/register`, 'post', data)
//         .then(res => {
//             console.log(res.data);
//             dispatch({ type: actionTypes.REGISTER_SUCCESS});
//         })
//         .catch(err => {
//             dispatch({ type: actionTypes.ERROR, error: err.response.data.message})
//         })
//     }
// };

export const getUserInfo = () => {
    return(dispatch) => {
        request(`/user-info`, 'get')
            .then(res => {
                console.log('info-------------',res.data);
                dispatch({ type: actionTypes.GET_USERINFO, data: res.data});
            })
            .catch(err => {
                dispatch({ type: actionTypes.ERROR, error: err.response.data.message})
            })
    }
};