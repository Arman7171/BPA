import request from '../../helpers/requests';
import * as actionTypes from './activityActionsType';

export const getBranches = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request('/branch/my-branches', 'get')
        .then(res => {
            console.log('masnacyuxer');
            dispatch({ type: actionTypes.GET_BRANCHES_SUCCESS, branches: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const addBranch = (newBranch) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        dispatch({ type: actionTypes.ADDING_BRANCHE})
        request('/branch/add', 'post', newBranch)
        .then(res => {
            dispatch({ type: actionTypes.ADD_BRANCHE_SUCCESS, branche: res.data})
        })
        .catch(err => {
            console.log('--------------err',err.response.data.error);
            dispatch({ type: actionTypes.ERROR, error: err.response.data.error})
        })
    }
};

export const removeBranch = (branches) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request('/branch/delete', 'patch', branches)
        .then(res => {
            dispatch({ type: actionTypes.REMOVE_BRANCHE_SUCCESS, branches})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const getWorkers = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request('/worker/my-workers', 'get')
        .then(res => {
            dispatch({ type: actionTypes.GET_WORKERS_SUCCESS, workers: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const addWorker = (newWorker) => {
    console.log('-------worker', newWorker);
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        dispatch({ type: actionTypes.ADDING_WORKER})
        request('/worker/add', 'post', newWorker)
        .then(res => {
            dispatch({ type: actionTypes.ADD_WORKERS_SUCCESS, worker: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.response.data.error})
        })
    }
};

export const removeWorker = (id) => {
    console.log('removeWorker', id);
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        dispatch({ type: actionTypes.REMOVING_WORKER})
        request(`/worker/delete/${id}`, 'delete')
        .then(res => {
            dispatch({ type: actionTypes.REMOVE_WORKER_SUCCESS, id})
        })
        .catch(err => {
            console.log('err', err.response);
            dispatch({ type: actionTypes.ERROR, error: err})
        })
    }
};

export const getProviders = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request('/provider/my-providers', 'get')
        .then(res => {
            dispatch({ type: actionTypes.GET_PROVIDERS_SUCCESS, providers: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const addProvider = (newProvider) => {
    console.log('-------newProvider', newProvider);
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        dispatch({ type: actionTypes.ADDING_PROVIDER})
        request('/provider/add', 'post', newProvider)
        .then(res => {
            dispatch({ type: actionTypes.ADD_PROVIDER_SUCCESS, provider: res.data})
        })
        .catch(err => {
            console.log(err.response);
            dispatch({ type: actionTypes.ERROR, error: err.response.data.error})
        })
    }
};

export const removeProvider = (id) => {
    console.log('removeWorker', id);
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        dispatch({ type: actionTypes.REMOVING_PROVIDER})
        request(`/provider/delete/${id}`, 'delete')
        .then(res => {
            dispatch({ type: actionTypes.REMOVE_PROVIDER_SUCCESS, id})
        })
        .catch(err => {
            console.log('err', err.response);
            dispatch({ type: actionTypes.ERROR, error: err})
        })
    }
};

export const getBranchWorkers = (id) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        dispatch({ type: actionTypes.REMOVING_PROVIDER})
        request(`/branch/branche-workers/${id}`)
        .then(res => {
            console.log('branche-worker--------', res);
            dispatch({ type: actionTypes.GET_BRANCH_WORKER_SUCCESS, branchWorkers: res.data})
        })
        .catch(err => {
            console.log('err', err.response);
            dispatch({ type: actionTypes.ERROR, error: err})
        })
    }
};

export const getBranchImports = (id, month, year) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        request(`/branch/branche-imports/${id}/?month=${month}&year=${year}`)
        .then(res => {
            console.log('branche-import--------', res);
            dispatch({ type: actionTypes.GET_BRANCH_IMPORTS_SUCCESS, importInfo: res.data})
        })
        .catch(err => {
            console.log('err', err.response);
            dispatch({ type: actionTypes.ERROR, error: err})
        })
    }
};

export const getBranchExports = (id, month, year) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        request(`/branch/branche-exports/${id}/?month=${month}&year=${year}`)
        .then(res => {
            console.log('branche-exports--------', res);
            dispatch({ type: actionTypes.GET_BRANCH_EXPORTS_SUCCESS, exportInfo: res.data})
        })
        .catch(err => {
            console.log('err', err.response);
            dispatch({ type: actionTypes.ERROR, error: err})
        })
    }
};

export const getBranchProducts = (limit, offset, id) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        request(`/branch/branche-products/?limit=${limit}&offset=${offset}&branchId=${id}`)
        .then(res => {
            console.log('branche-products--------', res);
            dispatch({ type: actionTypes.GET_BRANCH_PRODUCTS_SUCCESS, products: res.data})
        })
        .catch(err => {
            console.log('err', err.response);
            dispatch({ type: actionTypes.ERROR, error: err})
        })
    }
};

export const getUserImports = (month, year) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request(`/product/user-imports/?month=${month}&year=${year}`, 'get')
        .then(res => {
            dispatch({ type: actionTypes.GET_USER_IMPORTS_SUCCESS, imports: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const getExports = (month, year) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request(`/worker/exports/?month=${month}&year=${year}`, 'get')
        .then(res => {
            console.log('exports', res.data);
            dispatch({ type: actionTypes.GET_EXPORT_SUCCESS, exports: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const getIncome = (month, year) => {
    console.log('pocos', month, year);
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request(`/product/user-income/?month=${month}&year=${year}`, 'get')
        .then(res => {
            console.log('income----------', res.data);
            dispatch({ type: actionTypes.GET_INCOME_SUCCESS, obj: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const getProductsSell = (month, year) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request(`/product/top-selling-products/?month=${month}&year=${year}`, 'get')
        .then(res => {
            console.log('top-selling-products----------', res.data);
            dispatch({ type: actionTypes.GET_PRODUCTS_SELLS_PRCENT, obj: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const getSellingProducts = (month, year, branch) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request(`/product/selling-products/?month=${month}&year=${year}&branch=${branch}`, 'get')
        .then(res => {
            console.log('selling-products----------', res.data);
            dispatch({ type: actionTypes.GET_SELLING_PRODUCTS, obj: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const getSellingProductsCount = (month, year) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request(`/product/products-selling-count/?month=${month}&year=${year}`, 'get')
        .then(res => {
            console.log('selling-products----------', res.data);
            dispatch({ type: actionTypes.GET_SELLING_PRODUCTS_COUNT, products: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};



