import {connect} from 'react-redux';
import AuthPage from '../components/AuthPage';

import {bindActionCreators} from 'redux';
import {changeLogin, changePassword} from '../actions/auth';


// login, password - параметры формы
const onAuthSubmit = ({login, password}) =>
    event => {
        event.preventDefault();
        fetch('http://localhost:5000/auth', {
            method: 'POST',
            body: JSON.stringify({login, password}),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(
                response => response.json()
            )
            .then(
                jsonResponse => {}
            );
    };

const mapStateToProps = state => {
    const { auth: { login, password } } = state;
    const onSubmit = onAuthSubmit({login, password});
    return {
        login,
        password,
        onSubmit,
    };
};

const mapDispatchToProps = dispatch => ({
    changeLogin: bindActionCreators(changeLogin, dispatch),
    changePassword: bindActionCreators(changePassword, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
