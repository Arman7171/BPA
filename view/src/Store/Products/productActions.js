import request from '../../helpers/requests';
import * as actionTypes from './productActionsType';

export const addUserImport = (productData, providerId) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.PRODUCT_LOADING });
        dispatch({ type: actionTypes.ADDING_PRODUCT});
        request(`/product/add-products`, 'post', {productData, providerId})
        .then(res => {
            console.log(res.data);
            dispatch({ type: actionTypes.ADD_USER_IMPORT_SUCCESS});
            dispatch({ type: actionTypes.ADDED_PRODUCT});
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.response.data.message})
        })
    }
};

export const addWorkerImport = (data) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.PRODUCT_LOADING });
        dispatch({ type: actionTypes.ADDING_PRODUCT});
        request(`/worker/import`, 'post', {data})
        .then(res => {
            console.log(res.data);
            dispatch({ type: actionTypes.ADD_WORKER_IMPORT_SUCCESS});
            dispatch({ type: actionTypes.ADDED_PRODUCT});
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.response.data.message})
        })
    }
};

export const addWorkerExport = (data) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.PRODUCT_LOADING });
        dispatch({ type: actionTypes.ADDING_PRODUCT});
        request(`/worker/productsExport`, 'post', {data})
        .then(res => {
            console.log(res.data);
            dispatch({ type: actionTypes.ADD_WORKER_IMPORT_SUCCESS});
            dispatch({ type: actionTypes.ADDED_PRODUCT});
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.response.data.message})
        })
    }
};

export const getProductsCount = () => {
    return (dispatch) => {
        request(`/product/product-count`, 'get')
        .then(res => {
            console.log(res.data);
            dispatch({ type: actionTypes.GET_PRODUCTS_COUNT_SUCCESS, count: res.data});
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.response.data.message})
        })
    }
};

export const getUserProducts = (limit, offset) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.PRODUCT_LOADING });
        request(`/product/my-products/?limit=${limit}&offset=${offset}`, 'get')
        .then(res => {
            console.log(res.data);
            dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, products: res.data});
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.response.data.message})
        })
    }
};