import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// import logger from 'redux-logger';

import reducers from '../reducers';
import history from '../routes/history';

import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics';

const rootReducers = combineReducers({
    ...reducers,
    router: connectRouter(history),
});

const epicMiddleware = createEpicMiddleware();

const middleware = [
    epicMiddleware,
    routerMiddleware(history),
    // logger,
];

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(
    rootReducers,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);
epicMiddleware.run(rootEpic);

export default store;
