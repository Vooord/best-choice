import React from 'react';

import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

import PropTypes from 'prop-types';

import AuthPage from '../containers/AuthPage';
import MainTable from '../components/MainTable';


const MainRouter = ({history}) =>
    <ConnectedRouter history={history}>
        <Switch>
            <Route path="/auth" component={AuthPage}/>
            <Route path="/table" component={MainTable}/>
        </Switch>
    </ConnectedRouter>;


MainRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default MainRouter;
