import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { activityReducer } from './Activity/activityReducer';
import { authReducer } from './Auth/authReducer';
import { productReducer } from "./Products/productReducer";


const middlewares = applyMiddleware(thunk, logger);

const mainReducer = combineReducers({
    activityReducer,
    authReducer,
    productReducer
});

export const store = createStore(mainReducer, middlewares);

