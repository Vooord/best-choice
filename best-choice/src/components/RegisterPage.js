import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {Link, Redirect} from 'react-router-dom';
import Copyright from './CopyRight';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const label = {
    FIRST_NAME: 'Имя',
    SECOND_NAME: 'Фамилия',
    LOGIN: 'Логин',
    PASSWORD: 'Пароль',
    CONFIRM_PASSWORD: 'Повторите пароль',
};

const text = {
    REGISTER: 'Зарегистрироваться',
    AUTH_REDIRECT: 'Уже есть аккаунт? Войдите',
};

function SignUp(props) {
    const {
        firstName, lastName, login, password,
        changeFirstName, changeLastName, changeLogin, changePassword,
        onSubmit: onSubmitDispatch,
    } = props;


    const onSubmit = event => {
        event.preventDefault();
        return onSubmitDispatch();
    };
    const classes = useStyles();

    return (
        localStorage.getItem('token') ?
            <Redirect to={{ pathname: '/', state: { from: '/register' } }} />
            :
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <form className={classes.form} onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label={label.FIRST_NAME}
                                    value={firstName || ''}
                                    onChange={changeFirstName}
                                // autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label={label.SECOND_NAME}
                                    value={lastName || ''}
                                    onChange={changeLastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label={label.LOGIN}
                                    value={login || ''}
                                    onChange={changeLogin}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label={label.PASSWORD}
                                    type="password"
                                    value={password || ''}
                                    onChange={changePassword}
                                />
                            </Grid>

                            {/*<Grid item xs={12}>*/}
                            {/*    <TextField*/}
                            {/*        variant="outlined"*/}
                            {/*        required*/}
                            {/*        fullWidth*/}
                            {/*        label={label.CONFIRM_PASSWORD}*/}
                            {/*        type="password"*/}
                            {/*        value={}*/}
                            {/*        onChange={changePassword}*/}
                            {/*    />*/}
                            {/*</Grid>*/}

                            {/*<Grid item xs={12}>*/}
                            {/*    <FormControlLabel*/}
                            {/*        control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
                            {/*        label="I want to receive inspiration, marketing promotions and updates via email."*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >{text.REGISTER}</Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/auth">{text.AUTH_REDIRECT}</Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
    );
}

export default SignUp;
