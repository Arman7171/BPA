import * as actionTypes from './activityActionsType';

export const defaultState = {
    branches: [],
    workers: [],
    loading: false,
    errorMessage: '',
    addBranchSuccess: false,
    addWorkerSuccess: false
};


export const activityReducer = (state = defaultState, action) => {
    switch(action.type){
        case actionTypes.LOADING:
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

        case actionTypes.GET_BRANCHES_SUCCESS: 
            return {
                ...state,
                branches: action.branches,
                loading: false
            };    
        case actionTypes.ADDING_BRANCHE:
            return {
                ...state,
                addBranchSuccess: true
            };
        case actionTypes.ADD_BRANCHE_SUCCESS:
            return {
                ...state,
                branches: [action.branche, ...state.branches],
                addBranchSuccess: false,
                loading: false
            };
        case actionTypes.REMOVE_BRANCHE_SUCCESS:{
            let newBranches = [];
            action.branches.forEach(id => {
                console.log('id', id);
                newBranches = state.branches.filter((branch) => branch.id !== id);
            });
            return {
                ...state,
                branches: newBranches,
                loading: false
            };
        }

        case actionTypes.GET_WORKERS_SUCCESS:{
            return {
                ...state,
                workers: action.workers,
                loading: false
            };
        }
        case actionTypes.ADDING_WORKER:
            return {
                ...state,
                addWorkerSuccess: true
            };
        case actionTypes.ADD_WORKERS_SUCCESS:
            return {
                ...state,
                workers: [action.worker, ...state.workers],
                addWorkerSuccess: false,
                loading: false
            };
        
        default: return state;
    }
};