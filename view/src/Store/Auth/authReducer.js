import * as actionTypes from './authActionsType';

export const defaultState = {
    errorMessage: '',
    isAuthenticated: !!localStorage.getItem('token'),
    userType: !!localStorage.getItem('type'),
    name: '',
    lastName: ''
};


export const authReducer = (state = defaultState, action) => {
    switch(action.type){
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                errorMessage: '',
                loading: true
            };
        case actionTypes.ERROR: 
            return {
                ...state,
                errorMessage: action.error,
                loading: false,
            };
        case actionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                userType: !!localStorage.getItem('type'),
            }
        case actionTypes.GET_USERINFO:
            return{
                ...state,
                isAuthenticated: true,
                name: action.data.name,
                lastName: action.data.lastName
            }

            default: return state;
    }
};