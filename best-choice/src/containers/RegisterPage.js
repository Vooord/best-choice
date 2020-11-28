import { connect } from 'react-redux';
import RegisterPage from '../components/RegisterPage';

import { registerStart } from '../actions/register';
import { updateNewUser } from '../actions/user';

const mapStateToProps = state => {
    const {
        user: {
            new: {
                login, password, firstName, lastName,
            },
        },
    } = state;
    return {
        firstName,
        lastName,
        login,
        password,
    };
};

const mapDispatchToProps = dispatch => ({
    changeFirstName: event => dispatch(updateNewUser({ firstName: event.currentTarget.value })),
    changeLastName: event => dispatch(updateNewUser({ lastName: event.currentTarget.value })),
    changeLogin: event => dispatch(updateNewUser({ login: event.currentTarget.value })),
    changePassword: event => dispatch(updateNewUser({ password: event.currentTarget.value })),
    onSubmit: () => dispatch(registerStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
