import * as actionTypes from './productActionsType';

export const defaultState = {
    errorMessage: '',
    addImportSuccess: true,
    addingComplate: false,
    products: [],
    loading: false,
    productCount: 0
};


export const productReducer = (state = defaultState, action) => {
    switch(action.type){
        case actionTypes.PRODUCT_LOADING:
            return {
                ...state,
                errorMessage: '',
                loading: true,
                errorMessage: '',
                addImportSuccess: true,
                addingComplate: false,
                products: []
            };
        case actionTypes.ERROR: 
            return {
                ...state,
                errorMessage: action.error,
                loading: false,
            };
        
        case actionTypes.ADDING_PRODUCT: 
            return{
                ...state,
                addImportSuccess: false,
                addingComplate: false
            };
        case actionTypes.ADD_USER_IMPORT_SUCCESS:
            return{
                ...state,
                addImportSuccess: true,
                addingComplate: true,
                loading: false,
            };
        case actionTypes.ADD_WORKER_IMPORT_SUCCESS:
            return{
                ...state,
                addImportSuccess: true,
                addingComplate: true,
                loading: false,
            };
        case actionTypes.ADDED_PRODUCT:
            return{
                ...state,
                addImportSuccess: true,
                addingComplate: false
            };
        case actionTypes.GET_PRODUCTS_COUNT_SUCCESS:
            return{
                ...state,
                productCount: action.count
            };
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return{
                ...state,
                loading: false,
                products: state.products.concat(action.products)
            };
        case actionTypes.GET_STORE_PRODUCTS_SUCCESS:
            return{
                ...state,
                loading: false,
                products: state.products.concat(action.products.allProducts),
                productCount: action.products.productCount
            };
            default: return state;
    }
};