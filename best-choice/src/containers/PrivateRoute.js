import React from 'react';

import { connect } from 'react-redux';
import PrivateRouteComponent from '../components/PrivateRoute';

import { actualizeUser } from '../actions/user';
import PropTypes from 'prop-types';

const PrivateRoute = props => {
    const { actualizeCurrentUser, ...restProps } = props;
    actualizeCurrentUser();

    return <PrivateRouteComponent {...restProps} />;
};

PrivateRoute.propTypes = {
    actualizeCurrentUser: PropTypes.func, // eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
    actualizeCurrentUser: () => dispatch(actualizeUser()),
});

export default connect(null, mapDispatchToProps)(PrivateRoute);
