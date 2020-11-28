import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import PrivateRoute from '../containers/PrivateRoute';
import RegisterPage from '../containers/RegisterPage';
import AuthPage from '../containers/AuthPage';
import MainTableSwitcher from '../containers/MainTableSwitcher';
import { ToastContainer } from 'react-toastify';

const MainRouter = props => {
    const { history } = props;

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/auth" component={AuthPage} />
                <PrivateRoute path="/" component={MainTableSwitcher} />
                <Redirect from="*" to="/" />
            </Switch>
            <ToastContainer position={'top-right'} />
        </ConnectedRouter>
    );
};

MainRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default MainRouter;
