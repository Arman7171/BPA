import * as actionTypes from './activityActionsType';

export const defaultState = {
    branches: [],
    workers: [],
    providers: [],
    branchWorkers: [],
    branchProducts: [],
    loading: false,
    errorMessage: '',
    monthImports: 0,
    prevMonthImports: 0,
    branchImports: [],
    monthExports: 0,
    prevMonthExports: 0,
    branchExports: [],
    importPercent: 0,
    exportPracent: 0,
    addBranchSuccess: false,
    addWorkerSuccess: false,
    removeWorkerSuccess: false,
    addProviderSuccess: false,
    removeProviderSuccess: false,
    userImports: [],
    exports: [],
    income: 0,
    incomePracent: 0
};


export const activityReducer = (state = defaultState, action) => {
    switch(action.type){
        case actionTypes.LOADING:
            return {
                ...state,
                errorMessage: '',
                branchImports: [],
                branchExports: [],
                branchProducts: [],
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
        case actionTypes.GET_BRANCH_WORKER_SUCCESS:{
            return {
                ...state,
                branchWorkers: action.branchWorkers,
                loading: false
            };
        };
        case actionTypes.GET_BRANCH_IMPORTS_SUCCESS:{
            return {
                ...state,
                monthImports: action.importInfo.monthImports,
                importPercent: action.importInfo.percent,
                branchImports: action.importInfo.imports,
                prevMonthImports: action.importInfo.prevMonthImports,
                loading: false
            };
        };
        case actionTypes.GET_BRANCH_EXPORTS_SUCCESS:{
            return {
                ...state,
                monthExports: action.exportInfo.monthExports,
                exportPracent: action.exportInfo.percent,
                branchExports: action.exportInfo.exports,
                prevMonthExports: action.exportInfo.prevMonthExports,
                loading: false
            };
        };
        case actionTypes.GET_BRANCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                branchProducts: state.branchProducts.concat(action.products),
                loading: false
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
        
        case actionTypes.GET_USER_IMPORTS_SUCCESS:{
            return{
                ...state,
                userImports: action.imports,
                loading: false
            }
        };
        case actionTypes.GET_EXPORT_SUCCESS:{
            return{
                ...state,
                exports: action.exports,
                loading: false
            }
        };
        case actionTypes.GET_INCOME_SUCCESS:{
            return{
                ...state,
                income: action.obj.income,
                incomePracent: action.obj.income>action.obj.lastIncome ? action.obj.pracent : -action.obj.pracent,
                loading: false
            }
        };

        default: return state;
    }
};