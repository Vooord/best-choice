import React from 'react';

import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import PrivateRoute from '../components/PrivateRoute';

import RegisterPage from '../containers/RegisterPage';
import AuthPage from '../containers/AuthPage';
import MainTable from '../containers/MainTable';

import {actualizeUser} from '../actions/user';


const MainRouter = props => {
    const {
        history,
        actualizeCurrentUser,
    } = props;

    actualizeCurrentUser();

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/auth" component={AuthPage}/>
                <PrivateRoute path="/" component={MainTable}/>
                <Redirect from="*" to="/" />
            </Switch>
        </ConnectedRouter>
    );
};


MainRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    actualizeCurrentUser: () => dispatch(actualizeUser()),
});

export default connect(null, mapDispatchToProps)(MainRouter);
