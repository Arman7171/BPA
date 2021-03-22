import request from '../../helpers/requests';
import * as actionTypes from './activityActionsType';

export const getBranches = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request('/branch/my-branches', 'get')
        .then(res => {
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

export const getBranchImports = (id) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        request(`/branch/branche-imports/${id}`)
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

export const getBranchExports = (id) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        request(`/branch/branche-exports/${id}`)
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

export const getBranchProducts = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })
        request(`/branch/branche-products`)
        .then(res => {
            console.log('branche-exports--------', res);
            // dispatch({ type: actionTypes.GET_BRANCH_EXPORTS_SUCCESS, exportInfo: res.data})
        })
        .catch(err => {
            console.log('err', err.response);
            dispatch({ type: actionTypes.ERROR, error: err})
        })
    }
};