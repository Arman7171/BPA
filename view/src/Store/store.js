import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { activityReducer } from './Activity/activityReducer';


const middlewares = applyMiddleware(thunk, logger);

const mainReducer = combineReducers({
    activityReducer
});

export const store = createStore(mainReducer, middlewares);

