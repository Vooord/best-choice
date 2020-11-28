import React from 'react';

import { connect } from 'react-redux';
import LogoutButtonComponent from '../components/LogoutButton';

import { setCurrentUser } from '../actions/user';
import { setTopics } from '../actions/topic';
import history from '../routes/history';

const LogoutButton = props => {
    const {
        firstName, intervalId, resetCurrentUser, resetTopics,
    } = props;

    const onClick = () => {
        if (window.confirm(`${firstName}, вы точно уходите?`)) {
            clearInterval(intervalId);
            resetCurrentUser();
            resetTopics();
            localStorage.removeItem('token');
            history.push('/auth');
        }
    };

    return <LogoutButtonComponent onClick={onClick} />;
};

const mapStateToProps = state => {
    const { user: { current: { firstName, intervalId } } } = state;
    return {
        intervalId,
        firstName,
    };
};

const mapDispatchToProps = dispatch => ({
    resetCurrentUser: () => dispatch(setCurrentUser({})),
    resetTopics: () => dispatch(setTopics({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
