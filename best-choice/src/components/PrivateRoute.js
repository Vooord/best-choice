import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            localStorage.getItem('token')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
        )}
    />
);

PrivateRoute.propTypes = {
    // eslint-disable-next-line
    component: PropTypes.elementType, // реакт-компонент
};

export default PrivateRoute;
