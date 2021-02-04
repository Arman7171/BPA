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

