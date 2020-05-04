import {connect} from 'react-redux';
import AuthPage from '../components/AuthPage';

import {authStart} from '../actions/auth';
import {updateCurrentUser} from '../actions/user';

const mapStateToProps = state => {
    const { user: { current: {login, password} } } = state;
    return {
        login,
        password,
    };
};

const mapDispatchToProps = dispatch => ({
    changeLogin: event => dispatch(updateCurrentUser({login: event.currentTarget.value})),
    changePassword: event => dispatch(updateCurrentUser({password: event.currentTarget.value})),
    onSubmit: () => dispatch(authStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
