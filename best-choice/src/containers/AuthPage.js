import {connect} from 'react-redux';
import AuthPage from '../components/AuthPage';

import {changeLogin, changePassword, authStart} from '../actions/auth';


const mapStateToProps = state => {
    const { auth: { login, password } } = state;
    return {
        login,
        password,
    };
};

const mapDispatchToProps = dispatch => ({
    changeLogin: event => dispatch(changeLogin(event.currentTarget.value)),
    changePassword: event => dispatch(changePassword(event.currentTarget.value)),
    onSubmit: () => dispatch(authStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
