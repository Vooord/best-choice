import React from 'react';

import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

import PropTypes from 'prop-types';

import RegisterPage from '../containers/RegisterPage';
import AuthPage from '../containers/AuthPage';
import MainTable from '../containers/MainTable';


const MainRouter = ({history}) =>
    <ConnectedRouter history={history}>
        <Switch>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/auth" component={AuthPage}/>
            <Route path="/table" component={MainTable}/>
        </Switch>
    </ConnectedRouter>;


MainRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default MainRouter;
