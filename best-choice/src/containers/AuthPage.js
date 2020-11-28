import { connect } from 'react-redux';
import AuthPage from '../components/AuthPage';

import { authStart } from '../actions/auth';
import { updateNewUser } from '../actions/user';

const mapStateToProps = state => {
    const { user: { new: { login, password } } } = state;
    return {
        login,
        password,
    };
};

const mapDispatchToProps = dispatch => ({
    changeLogin: event => dispatch(updateNewUser({ login: event.currentTarget.value })),
    changePassword: event => dispatch(updateNewUser({ password: event.currentTarget.value })),
    onSubmit: () => dispatch(authStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
