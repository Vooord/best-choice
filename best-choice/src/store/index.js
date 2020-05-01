import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {connectRouter, routerMiddleware} from 'connected-react-router';
// import logger from 'redux-logger';

import reducers from '../reducers';
import history from '../routes/history';


const rootReducers = combineReducers({
    ...reducers,
    router: connectRouter(history),
});

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const middleware = [
    routerMiddleware(history),
    // logger,
];

const store = createStore(
    rootReducers,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);

export default store;
