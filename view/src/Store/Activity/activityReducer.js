import * as actionTypes from './activityActionsType';

export const defaultState = {
    branches: [],
    workers: [],
    providers: [],
    loading: false,
    errorMessage: '',
    addBranchSuccess: false,
    addWorkerSuccess: false,
    removeWorkerSuccess: false,
    addProviderSuccess: false,
    removeProviderSuccess: false,
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
                branches: action.branches.reverse(),
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
        };
        
        case actionTypes.GET_WORKERS_SUCCESS:
            return {
                ...state,
                workers: action.workers.reverse(),
                loading: false
            };
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
        case actionTypes.REMOVING_WORKER:
            return {
                ...state,
                removeWorkerSuccess: true
            };
        case actionTypes.REMOVE_WORKER_SUCCESS:{
            let workers = [...state.workers];
            workers = workers.filter((worker) => worker.id !== action.id);
            return{
                ...state,
                removeWorkerSuccess: false,
                workers,
                loading: false
            }
        };
        
        case actionTypes.GET_PROVIDERS_SUCCESS:
            return {
                ...state,
                providers: action.providers.reverse(),
                loading: false
            };   
        case actionTypes.ADDING_PROVIDER:
            return{
                ...state,
                addProviderSuccess: true
            };
        case actionTypes.ADD_PROVIDER_SUCCESS:
            return {
                ...state,
                providers: [action.provider, ...state.providers],
                addProviderSuccess: false,
                loading: false
            };
        case actionTypes.REMOVING_PROVIDER:
            return{
                ...state,
                removeProviderSuccess: true
            };
        case actionTypes.REMOVE_PROVIDER_SUCCESS:{
            let providers = [...state.providers ];
            providers = providers.filter((provider) => provider.id !== action.id);
                return{
                    ...state,
                    removeProviderSuccess: false,
                    providers,
                    loading: false
                }
            };
        
        
            default: return state;
    }
};